package com.cmpe275.termproject.resource;

import com.cmpe275.termproject.model.*;
import com.cmpe275.termproject.repository.*;
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
import java.util.UUID;

import java.util.*;

@RestController
@RequestMapping(value = "/survey")
public class SurveyResource {

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

    @Transactional
    @PostMapping(value = "/addsurveyees",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addSurvees(@RequestBody Map<String, Object> payload) throws JSONException {

        SurveyEntity surveyEntity;

        JSONObject jsonObject = new JSONObject(payload);
        surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));
        String[] newinvitees = jsonObject.getString("invitees").split(",");

        for(String s:newinvitees)
        {
            surveyEntity.getClosed_surveys();


            ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
            closedSurveyEntity.setSurveyId(surveyEntity);

            List<UserEntity> userEntity = userRepository.findByEmail(s);
            closedSurveyEntity.setInviteeUserId(userEntity.get(0));
            UUID uuid = UUID.randomUUID();
            closedSurveyEntity.setInvitee_link("http://localhost:8080/" + surveyEntity.getSurvey_id() + "/" + String.valueOf(uuid));
            closedSurveyRepository.save(closedSurveyEntity);
        }


        return new ResponseEntity("OK" , HttpStatus.OK);
    }


    // when save/publish for the first time
    @Transactional
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createSurvey(@RequestBody Map<String, Object> payload) throws JSONException {

        SurveyEntity surveyEntity = new SurveyEntity();

        JSONObject jsonObject = new JSONObject(payload);

        // Logic for updating the survey

        if (jsonObject.getInt("survey_id") != 0)
        {
            if(surveyRepository.findOne(jsonObject.getInt("survey_id")).isIs_published())
            {
                return new ResponseEntity("Already Published" , HttpStatus.BAD_REQUEST);
            }
        }

        if (jsonObject.getInt("survey_id") != 0)
        {
           surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));

            // Adding the survey details
            surveyEntity.setSurvey_name(jsonObject.getString("survey_name"));
            surveyEntity.setIs_published(jsonObject.getBoolean("is_published"));
            surveyEntity.setSurvey_type(jsonObject.getString("survey_type"));
            surveyEntity.setUser_id(userRepository.findOne(jsonObject.getInt("user_id")));

            // removing older question and options
            for(QuestionEntity q : surveyEntity.getQuestions())
            {
                q.getOptions().clear();
                questionRepository.save(q);
            }

            surveyEntity.getQuestions().clear();

            // save the survey
            surveyRepository.save(surveyEntity);

            JSONArray question_array = jsonObject.getJSONArray("questions");
            Set<QuestionEntity> question_list = new HashSet<>();

            for(int i = 0; i < question_array.length(); i++)
            {
                JSONObject question_object = question_array.getJSONObject(i);

                QuestionEntity questionEntity = new QuestionEntity();

                // Adding the question details
                questionEntity.setQuestion_text(question_object.getString("question_name"));
                questionEntity.setQuestion_type(question_object.getString("question_type"));
                questionEntity.setSurvey_id(surveyEntity);
                questionRepository.save(questionEntity);

                JSONArray options_array = question_object.getJSONArray("options");
                Set<OptionsEntity> option_list = new HashSet<>();

                for(int j = 0; j < options_array.length(); j++)
                {
                    JSONObject option_object = options_array.getJSONObject(j);
                    System.out.println("option_object"+option_object);
                    OptionsEntity optionsEntity = new OptionsEntity();
                    optionsEntity.setOption_description(option_object.getString("option_description"));
                    optionsEntity.setQuestion_id(questionEntity);
                    optionsRepository.save(optionsEntity);


                }
            }
        }

        // NEW SURVEY

        else {

            // Adding the survey details
            surveyEntity.setSurvey_name(jsonObject.getString("survey_name"));
            surveyEntity.setIs_published(jsonObject.getBoolean("is_published"));
            surveyEntity.setSurvey_type(jsonObject.getString("survey_type"));
            surveyEntity.setUser_id(userRepository.findOne(jsonObject.getInt("user_id")));

            // save the survey
            surveyRepository.save(surveyEntity);

            // Fetched the questions Array for the surveys
            JSONArray question_array = jsonObject.getJSONArray("questions");
            Set<QuestionEntity> question_list = new HashSet<>();


            for (int i = 0; i < question_array.length(); i++) {
                JSONObject question_object = question_array.getJSONObject(i);

                QuestionEntity questionEntity = new QuestionEntity();

                // Adding the question details
                questionEntity.setQuestion_text(question_object.getString("question_name"));
                questionEntity.setQuestion_type(question_object.getString("question_type"));
                questionEntity.setSurvey_id(surveyEntity);
                questionRepository.save(questionEntity);

                JSONArray options_array = question_object.getJSONArray("options");
                Set<OptionsEntity> option_list = new HashSet<>();

                for (int j = 0; j < options_array.length(); j++) {
                    JSONObject option_object = options_array.getJSONObject(j);
                    System.out.println("option_object" + option_object);
                    OptionsEntity optionsEntity = new OptionsEntity();
                    optionsEntity.setOption_description(option_object.getString("option_description"));
                    optionsEntity.setQuestion_id(questionEntity);
                    optionsRepository.save(optionsEntity);


                }
            }

            //Save the Survey
            SurveyEntity se = surveyRepository.save(surveyEntity);

            // Survey Type logic handling

            if (jsonObject.getString("survey_type").equals("C")) {
                // Generating invitees array
                String[] invitess = jsonObject.getString("closed_invitees").split(",");

                for (String user : invitess) {
                    ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
                    closedSurveyEntity.setSurveyId(surveyEntity);

                    List<UserEntity> userEntity = userRepository.findByEmail(user);
                    closedSurveyEntity.setInviteeUserId(userEntity.get(0));
                    UUID uuid = UUID.randomUUID();
                    closedSurveyEntity.setInvitee_link("http://localhost:8080/" + se.getSurvey_id() + "/" + String.valueOf(uuid));
                    closedSurveyRepository.save(closedSurveyEntity);

                }

            }

            if (jsonObject.getString("survey_type").equals("G")) {

            }
        }

            return new ResponseEntity("OK" , HttpStatus.OK);
    }

    // Unpublish mate change karvanu 6e
    // currently, survey ni entry delete thai jay 6e
    // but end time update karbvanu 6

    // also check if any response received

    @Transactional
    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> closeSurvey(@RequestBody Map<String, Object> payload) throws JSONException {

        JSONObject jsonObject = new JSONObject(payload);

         //jsonObject.getInt("survey_id") != 0

            SurveyEntity surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));


            // removing older question and options
            for(QuestionEntity q : surveyEntity.getQuestions())
            {
                q.getOptions().clear();
                questionRepository.save(q);
            }

            surveyEntity.getQuestions().clear();
            surveyRepository.delete(surveyEntity);

        return new ResponseEntity("OK" , HttpStatus.OK);
    }
}


