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

import java.text.SimpleDateFormat;
import java.util.UUID;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @Autowired
    OpenSurveyRepository openSurveyRepository;

    @Autowired
    OpenUniqueSurveyRepository openUniqueSurveyRepository;

    @Transactional
    @JsonView({SurveyResponse.summary.class})
    @GetMapping(value = "/{surveyId}")
    public ResponseEntity<?> sendSavedResponse(@RequestParam("userId") Integer userId,
                                               @PathVariable("surveyId") Integer surveyId) throws JSONException {
        if(new Date().after(surveyRepository.findOne(surveyId).getEndTime())){
            SavedResponse savedResponse = new SavedResponse();

            savedResponse.setSurveyId(surveyId);
            savedResponse.setUserId(userId);

            SurveyEntity s = surveyRepository.findOne(surveyId);
            List<QuestionEntity> questions = questionRepository.findAllBySurveyId(s);
            savedResponse.setQuestions(questions);

            return new ResponseEntity(savedResponse, HttpStatus.OK);
        }
        else{
            BadRequest badRequest = BadRequest.createBadRequest(400, "Sorry, the survey you are looking for has already expired");
            return new ResponseEntity<BadRequest>(badRequest, HttpStatus.BAD_REQUEST);
        }
    }

    @Transactional
    @PostMapping(value = "/addsurveyees",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addSurvees(@RequestBody Map<String, Object> payload) throws JSONException {

        SurveyEntity surveyEntity;

        JSONObject jsonObject = new JSONObject(payload);
        surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));
        String[] newinvitees = jsonObject.getString("invitees").split(",");

        Set<ClosedSurveyEntity> old_closed_survey_entries = surveyEntity.getClosed_surveys();

        System.out.println("old_closed_survey_entries:"+old_closed_survey_entries);
        Set<UserEntity> old_users = new HashSet<>();
        for(ClosedSurveyEntity c :old_closed_survey_entries )
        {
            System.out.println("c.getInvitee_user_id():"+c.getInviteeUserId());
            old_users.add(c.getInviteeUserId());
        }



        for(String s:newinvitees)
        {
            ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
            closedSurveyEntity.setSurveyId(surveyEntity);

            List<UserEntity> userEntity = userRepository.findByEmail(s);

            closedSurveyEntity.setInviteeUserId(userEntity.get(0));

            // if user already exists skip the addition

            if(old_users.contains(userEntity.get(0)))
            {
                System.out.println("Already in the list");
                continue;
            }

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
        System.out.println("jsonObject:"+jsonObject);

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

            try {
                String endTime = jsonObject.getString("end_time");
                //  DATE FORMAT FROM HTML <input type="datetime-local" : 2018-05-09T14:02
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm");
                Date endDateTime = formatter.parse(endTime);
                surveyEntity.setEndTime(endDateTime);
            }
            catch (Exception e){
                System.out.println(e);
            }

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
                questionEntity.setQuestion_text(question_object.getString("question_text"));
                questionEntity.setQuestion_type(question_object.getString("question_type"));
                questionEntity.setSurveyId(surveyEntity);
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

                // if Survey is a closed survey then update the Invitess also


            }

            // Survey Type logic handling
            if (jsonObject.getString("survey_type").equals("G")) {

                OpenSurveyEntity openSurveyEntity = new OpenSurveyEntity();
                openSurveyEntity.setSurvey_id(surveyEntity);
                UUID uuid = UUID.randomUUID();
                openSurveyEntity.setInvitation_link("http://localhost:8080/" + surveyEntity.getSurvey_id() + "/" + String.valueOf(uuid));
                openSurveyEntity.setIslinkused(0);
                openSurveyRepository.save(openSurveyEntity);

            }
            if (jsonObject.getString("survey_type").equals("C") && jsonObject.getString("closed_invitees")!="") {
                // Generating invitees array

                String[] invitess = jsonObject.getString("closed_invitees").split(",");
                //System.out.println(jsonObject.getString("closed_invitees")+":abcdefghijkl");
                //System.out.println(invitess.length+"abcdefghijkl");
                for (String user : invitess) {
                    ClosedSurveyEntity closedSurveyEntity = new ClosedSurveyEntity();
                    closedSurveyEntity.setSurveyId(surveyEntity);

                    List<UserEntity> userEntity = userRepository.findByEmail(user);
                    closedSurveyEntity.setInviteeUserId(userEntity.get(0));
                    UUID uuid = UUID.randomUUID();
                    closedSurveyEntity.setInvitee_link("http://localhost:8080/" + surveyEntity.getSurvey_id() + "/" + String.valueOf(uuid));
                    closedSurveyRepository.save(closedSurveyEntity);

                }

            }

            if (jsonObject.getString("survey_type").equals("O")) {

                OpenUniqueSurveyEntity openUniqueSurveyEntity = new OpenUniqueSurveyEntity();
                openUniqueSurveyEntity.setSurvey_id(surveyEntity);
                UUID uuid = UUID.randomUUID();
                openUniqueSurveyEntity.setInvitation_link("http://localhost:8080/" + surveyEntity.getSurvey_id() + "/" + String.valueOf(uuid));
                openUniqueSurveyEntity.setIslinkused("");
                openUniqueSurveyRepository.save(openUniqueSurveyEntity);




            }
        }

        // NEW SURVEY

        else {

            // Adding the survey details
            surveyEntity.setSurvey_name(jsonObject.getString("survey_name"));
            surveyEntity.setIs_published(jsonObject.getBoolean("is_published"));
            surveyEntity.setSurvey_type(jsonObject.getString("survey_type"));
            surveyEntity.setUser_id(userRepository.findOne(jsonObject.getInt("user_id")));

            try {
                String endTime = jsonObject.getString("end_time");
                //  DATE FORMAT FROM HTML <input type="datetime-local" : 2018-05-09T14:02
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm");
                Date endDateTime = formatter.parse(endTime);
                surveyEntity.setEndTime(endDateTime);
            }
            catch (Exception e){
                System.out.println(e);
            }

            // save the survey
            surveyRepository.save(surveyEntity);

            // Fetched the questions Array for the surveys
            JSONArray question_array = jsonObject.getJSONArray("questions");
            Set<QuestionEntity> question_list = new HashSet<>();


            for (int i = 0; i < question_array.length(); i++) {
                JSONObject question_object = question_array.getJSONObject(i);

                QuestionEntity questionEntity = new QuestionEntity();

                // Adding the question details
                questionEntity.setQuestion_text(question_object.getString("question_text"));
                questionEntity.setQuestion_type(question_object.getString("question_type"));
                questionEntity.setSurveyId(surveyEntity);
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
        }

            return new ResponseEntity("OK" , HttpStatus.OK);
    }

    // Unpublish mate change karvanu 6e
    // currently, survey ni entry delete thai jay 6e
    // but end time update karbvanu 6 - DONE!!!

    // also check if any response received

    @Transactional
    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> closeSurvey(@RequestBody Map<String, Object> payload) throws JSONException {

        JSONObject jsonObject = new JSONObject(payload);

         //jsonObject.getInt("survey_id") != 0

            SurveyEntity surveyEntity = surveyRepository.findOne(jsonObject.getInt("survey_id"));


//            // removing older question and options
//            for(QuestionEntity q : surveyEntity.getQuestions())
//            {
//                q.getOptions().clear();
//                questionRepository.save(q);
//            }
//
//            surveyEntity.getQuestions().clear();

//            surveyRepository.delete(surveyEntity);
            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.YEAR, 1969);
            cal.set(Calendar.MONTH, Calendar.DECEMBER);
            cal.set(Calendar.DAY_OF_MONTH, 31);
            surveyEntity.setEndTime(cal.getTime());
            surveyRepository.save(surveyEntity);

        return new ResponseEntity("OK" , HttpStatus.OK);
    }

    @Transactional
    @JsonView({Survey.summary.class})
    @GetMapping(value = "/allsavedsurveys")
    public ResponseEntity<?> allSavedSurveys(@RequestParam("user_id") int user_id) throws JSONException {

        //JSONObject jsonObject = new JSONObject(payload);
        //int user_id = jsonObject.getInt("user_id");
        //System.out.println("user_id:"+user_id);
        UserEntity userEntity = userRepository.findOne(user_id);

        if(userEntity== null)
        {
            return new ResponseEntity("No Such User!!",HttpStatus.OK);
        }

        //System.out.println("userEntity.getSurveys():"+userEntity.getSurveys());

//        for (SurveyEntity s:userEntity.getSurveys())
//        {
//            System.out.println(s.getSurvey_id()+ "::"+s.getSurvey_name());
//        }
        //njndvhubvuhb
        //return new ResponseEntity(userEntity.getSurveys() , HttpStatus.OK);
        //System.out.println(surveyRepository.findByIspublishedAndUserid(true,userEntity));

        return new ResponseEntity(surveyRepository.findByUseridAndEndTimeGreaterThan(userEntity, new Date()),HttpStatus.OK);
    }
}


