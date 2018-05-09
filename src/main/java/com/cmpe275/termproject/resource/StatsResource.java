package com.cmpe275.termproject.resource;

import com.cmpe275.termproject.helperClasses.BadRequest;
import com.cmpe275.termproject.helperClasses.SavedResponse;
import com.cmpe275.termproject.helperClasses.SurveyStats;
import com.cmpe275.termproject.model.*;
import com.cmpe275.termproject.repository.*;
import com.cmpe275.termproject.view.Stats;
import com.cmpe275.termproject.view.Survey;
import com.cmpe275.termproject.view.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/stats")
public class StatsResource {

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
    OpenSurveyRepository openSurveyRepository;

    @Autowired
    OpenUniqueSurveyRepository openUniqueSurveyRepository;

    @Transactional
    @JsonView({Stats.summary.class})
    @GetMapping(value = "/{surveyId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveResponse(@PathVariable("surveyId") String sId) throws JSONException {

        SurveyStats surveyStats = new SurveyStats();
        Integer surveyId = Integer.parseInt(sId);
        SurveyEntity surveyEntity = surveyRepository.findBySurveyId(surveyId);

        String type = surveyEntity.getSurvey_type();
        float numberOfPart = 0;
        float numOfRegistered = 0;
        boolean submitted = false;
        if(type.equals("G")){
            List<OpenSurveyEntity> openSurveyEntities = openSurveyRepository.findAllBySurveyId(surveyEntity);
            numberOfPart = (float)openSurveyEntities.size();
            numOfRegistered = numberOfPart;
        }
        else if(type.equals("C")){
            List<ClosedSurveyEntity> closedSurveyEntities = closedSurveyRepository.findAllBySurveyIdAndIslinkused(surveyEntity,1);
            List<ClosedSurveyEntity> closedSurveyEntities1 = closedSurveyRepository.findAllBySurveyId(surveyEntity);
            numberOfPart = (float)closedSurveyEntities.size();
            numOfRegistered = (float)closedSurveyEntities1.size();
        }
        else if(type.equals("O")){
            List<OpenUniqueSurveyEntity> openUniqueSurveyEntities = openUniqueSurveyRepository.findAllBySurveyIdAndIslinkused(surveyEntity,1);
            List<OpenUniqueSurveyEntity> openUniqueSurveyEntities1 = openUniqueSurveyRepository.findAllBySurveyId(surveyEntity);
            numberOfPart = (float)openUniqueSurveyEntities.size();
            numOfRegistered = (float)openUniqueSurveyEntities1.size();
        }

        List<QuestionEntity> questions = questionRepository.findAllBySurveyId(surveyEntity);
//        for(QuestionEntity q: questions) {
//            System.out.println("QUESTIONID: "+q.getQuestion_text());
//            Set<AnswerEntity> answers = q.getAnswers();
//            Set<OptionsEntity> options = q.getOptions();
//            for(OptionsEntity o: options){
//                for(AnswerEntity a: answers){
//                    if(a.getOptionId() == o.getOption_id()){
//                        if(type.equals("C")) {
//                            if(closedSurveyRepository.findOneByEmailIdAndSurveyId(a.getEmailId(), surveyEntity).getIslinkused() == 1)
//                                o.setCount(o.getCount() + 1);
//                        }
//                        else if(type.equals("O")) {
//                            if(openUniqueSurveyRepository.findOneByEmailIdAndSurveyId(a.getEmailId(), surveyEntity).getIslinkused() == 1)
//                                o.setCount(o.getCount() + 1);
//                        }
//                        else{
//                            o.setCount(o.getCount() + 1);
//                        }
//                        optionsRepository.save(o);
//                    }
//                }
//            }
//        }

        surveyStats.setStartTime(surveyEntity.getStartTime());
        surveyStats.setEndTime(surveyEntity.getEndTime());
        surveyStats.setNumOfParticipants(numberOfPart);
        surveyStats.setNumOfRegisteredUsers(numOfRegistered);
        surveyStats.setQuestions(questions);

        if(numberOfPart >= 2)
            return new ResponseEntity(surveyStats, HttpStatus.OK);
        else
            return new ResponseEntity("Fewer than two participants", HttpStatus.OK);
    }
}