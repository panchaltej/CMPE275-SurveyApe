package com.cmpe275.termproject.resource;

import com.cmpe275.termproject.helperClasses.BadRequest;
import com.cmpe275.termproject.helperClasses.SavedResponse;
import com.cmpe275.termproject.model.*;
import com.cmpe275.termproject.repository.*;
import com.cmpe275.termproject.view.Survey;
import com.cmpe275.termproject.view.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonView;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/survey/response")
public class ResponseResource {

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    OptionsRepository optionsRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ClosedSurveyRepository closedSurveyRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    OpenUniqueSurveyRepository openUniqueSurveyRepository;

    @Autowired OpenSurveyRepository openSurveyRepository;

    @Transactional
    @PostMapping(value = "/save",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveResponse(@RequestBody Map<String, Object> payload) throws JSONException {

        System.out.println("Inside the answers");

        JSONObject jsonObject = new JSONObject(payload);
        System.out.println(jsonObject);
        String uuid = jsonObject.getString("uuid");
        System.out.println("jsonObject.getString:uuid"+jsonObject.getString("uuid"));
        Integer survey_id = jsonObject.getInt("surveyId");
        String emailId ="";
        SurveyEntity se = surveyRepository.findOne(survey_id);
        //if(new Date().after(se.getEndTime())) {
            String type = se.getSurvey_type();

            if (type.equals("C")) {
                ClosedSurveyEntity closedSurveyEntity = closedSurveyRepository.findByUuid(uuid);
                if (closedSurveyEntity != null) {
                    emailId = closedSurveyEntity.getInviteeUserId().getEmail_id();
                }
            } else if (type.equals("O")) {
                OpenUniqueSurveyEntity openUniqueSurveyEntity = openUniqueSurveyRepository.findOneByUuid(uuid);
                if (openUniqueSurveyEntity != null) {
                    emailId = openUniqueSurveyEntity.getEmailId();
                }
            }

            saveResponse(jsonObject, emailId, type, false);

            return new ResponseEntity("SUCCESS", HttpStatus.OK);
//        }
//        else{
//            BadRequest badRequest = BadRequest.createBadRequest(400, "Sorry, the survey you are looking for has already expired");
//            return new ResponseEntity<BadRequest>(badRequest, HttpStatus.BAD_REQUEST);
//        }
    }

    @Transactional
    @PostMapping(value = "/submit",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitResponse(@RequestBody Map<String, Object> payload) throws JSONException {

        JSONObject jsonObject = new JSONObject(payload);
        Integer survey_id = jsonObject.getInt("surveyId");
        String emailId ="";
        String uuid = jsonObject.getString("uuid");

        SurveyEntity se = surveyRepository.findOne(survey_id);
        if(new Date().after(se.getEndTime())) {
            String type = se.getSurvey_type();

            if (type.equals("C")) {
                ClosedSurveyEntity closedSurveyEntity = closedSurveyRepository.findByUuid(uuid);
                if (closedSurveyEntity != null) {
                    emailId = closedSurveyEntity.getInviteeUserId().getEmail_id();
                    closedSurveyEntity.setIslinkused(1);
                }
            } else if (type.equals("O")) {
                OpenUniqueSurveyEntity openUniqueSurveyEntity = openUniqueSurveyRepository.findOneByUuid(uuid);
                if (openUniqueSurveyEntity != null) {
                    emailId = openUniqueSurveyEntity.getEmailId();
                    openUniqueSurveyEntity.setIslinkused(1);
                }
            }
            saveResponse(jsonObject, emailId, type, true);

            return new ResponseEntity("SUCCESS", HttpStatus.OK);
        }
        else{
            BadRequest badRequest = BadRequest.createBadRequest(400, "Sorry, the survey you are looking for has already expired");
            return new ResponseEntity<BadRequest>(badRequest, HttpStatus.BAD_REQUEST);
        }
    }

    public void saveResponse(JSONObject jsonObject, String emailId, String type, boolean isSubmit){
        try {
            Integer survey_id = jsonObject.getInt("surveyId");
//            Integer user_id = jsonObject.getInt("user_id");
            SurveyEntity surveyEntity = surveyRepository.findBySurveyId(survey_id);
            JSONArray questions = jsonObject.getJSONArray("questions");
            System.out.println("EMAILID "+emailId);
            answerRepository.deleteByEmailIdAndSurveyId(emailId, survey_id);

            for (int i = 0; i < questions.length(); i++) {
                JSONObject question = questions.getJSONObject(i);
                Integer question_id = question.getInt("question_id");
                JSONArray answers = question.getJSONArray("answers");
                JSONArray options = question.getJSONArray("options");
                System.out.println(question_id);

                for (int j = 0; j < answers.length(); j++) {
                    JSONObject answer = answers.getJSONObject(j);
                    Integer answer_id = answer.getInt("optionId");
                    String answer_description = answer.getString("optionDescription");

                    AnswerEntity answerEntity = new AnswerEntity();
                    QuestionEntity questionEntity = questionRepository.findOne(question_id);
//                    answerEntity.setUserId(user_id);
                    answerEntity.setEmailId(emailId);
                    answerEntity.setSurveyId(survey_id);
                    answerEntity.setQuestionId(questionEntity);
                    answerEntity.setOptionId(answer_id);
                    answerEntity.setAnswerdescription(answer_description);

                    answerRepository.save(answerEntity);

                    if(isSubmit) {
                        for (int k = 0; k < options.length(); k++) {
                            JSONObject option = options.getJSONObject(j);
                            Integer option_id = option.getInt("optionId");
                            OptionsEntity o = optionsRepository.findOne(option_id);
                            if (answer_id == option_id) {
                                if (type.equals("C")) {
                                    if (closedSurveyRepository.findOneByEmailIdAndSurveyId(emailId, surveyEntity).getIslinkused() == 1) {
                                        o.setCount(o.getCount() + 1);
                                    }
                                } else if (type.equals("O")) {
                                    if (openUniqueSurveyRepository.findOneByEmailIdAndSurveyId(emailId, surveyEntity).getIslinkused() == 1)
                                        o.setCount(o.getCount() + 1);
                                } else {
                                    o.setCount(o.getCount() + 1);
                                }
                                optionsRepository.save(o);
                            }
                        }
                    }

                }
            }
        }
        catch (Exception e){
            System.out.println(e);
        }
    }
}