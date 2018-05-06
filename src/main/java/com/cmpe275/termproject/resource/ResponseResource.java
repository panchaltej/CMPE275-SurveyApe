package com.cmpe275.termproject.resource;

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

    @Transactional
    @PostMapping(value = "/save",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveResponse(@RequestBody Map<String, Object> payload) throws JSONException {
        JSONObject jsonObject = new JSONObject(payload);
        saveResponse(jsonObject);

        return new ResponseEntity("SUCCESS" , HttpStatus.OK);
    }

    @Transactional
    @PostMapping(value = "/submit",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> submitResponse(@RequestBody Map<String, Object> payload) throws JSONException {

        JSONObject jsonObject = new JSONObject(payload);
        Integer survey_id = jsonObject.getInt("survey_id");
        Integer user_id = jsonObject.getInt("user_id");

        ClosedSurveyEntity closedSurveyEntity = closedSurveyRepository.findBySurveyIdAndInviteeUserId(survey_id, user_id);
        if(closedSurveyEntity != null) closedSurveyEntity.setIslinkused(1);

        saveResponse(jsonObject);

        return new ResponseEntity("SUCCESS" , HttpStatus.OK);
    }

    public void saveResponse(JSONObject jsonObject){
        try {
            Integer survey_id = jsonObject.getInt("survey_id");
            Integer user_id = jsonObject.getInt("user_id");
            JSONArray questions = jsonObject.getJSONArray("questions");

            answerRepository.deleteByUserIdAndSurveyId(user_id, survey_id);

            for (int i = 0; i < questions.length(); i++) {
                JSONObject question = questions.getJSONObject(i);
                Integer question_id = question.getInt("question_id");
                JSONArray answers = question.getJSONArray("answers");
                System.out.println(question_id);

                for (int j = 0; j < answers.length(); j++) {
                    JSONObject answer = answers.getJSONObject(j);
                    Integer answer_id = answer.getInt("option_id");
                    String answer_description = answer.getString("option_description");

                    AnswerEntity answerEntity = new AnswerEntity();
                    answerEntity.setUserId(user_id);
                    answerEntity.setSurveyId(survey_id);
                    answerEntity.setQuestionId(question_id);
                    answerEntity.setOptionId(answer_id);
                    answerEntity.setAnswerdescription(answer_description);

                    answerRepository.save(answerEntity);
                }
            }
        }
        catch (Exception e){
            System.out.println(e);
        }
    }
}