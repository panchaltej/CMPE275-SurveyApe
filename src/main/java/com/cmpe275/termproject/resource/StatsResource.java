package com.cmpe275.termproject.resource;

import com.cmpe275.termproject.helperClasses.BadRequest;
import com.cmpe275.termproject.helperClasses.SavedResponse;
import com.cmpe275.termproject.helperClasses.SurveyStats;
import com.cmpe275.termproject.model.*;
import com.cmpe275.termproject.repository.*;
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

@RestController
@RequestMapping(value = "/survey/stats")
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
    @GetMapping(value = "/{surveyId}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveResponse(@PathVariable("surveyId") Integer surveyId) throws JSONException {

        SurveyStats surveyStats = new SurveyStats();
        SurveyEntity surveyEntity = surveyRepository.findBySurveyId(surveyId);

        String type = surveyEntity.getSurvey_type();
        float numberOfPart = 0;
        float numOfRegistered = 0;
        if(type == "G"){
            List<OpenSurveyEntity> openSurveyEntities = openSurveyRepository.findAllBySurveyId(surveyEntity);
            numberOfPart = (float)openSurveyEntities.size();
            numOfRegistered = numberOfPart;
        }
        else if(type == "C"){
            List<ClosedSurveyEntity> closedSurveyEntities = closedSurveyRepository.findAllBySurveyIdAndIslinkused(surveyEntity,1);
            List<ClosedSurveyEntity> closedSurveyEntities1 = closedSurveyRepository.findAllBySurveyId(surveyEntity);
            numberOfPart = (float)closedSurveyEntities.size();
            numOfRegistered = (float)closedSurveyEntities1.size();
        }
        else if(type == "O"){
            List<OpenUniqueSurveyEntity> openUniqueSurveyEntities = openUniqueSurveyRepository.findAllBySurveyIdAndIslinkused(surveyEntity,1);
            List<OpenUniqueSurveyEntity> openUniqueSurveyEntities1 = openUniqueSurveyRepository.findAllBySurveyId(surveyEntity);
            numberOfPart = (float)openUniqueSurveyEntities.size();
            numOfRegistered = (float)openUniqueSurveyEntities1.size();
        }

        List<QuestionEntity> questions = questionRepository.findAllBySurveyId(surveyEntity);
        for(QuestionEntity q: questions) {
            Set<AnswerEntity> answers = q.getAnswers();
            Set<OptionsEntity> options = q.getOptions();
            for(OptionsEntity o: options){
                for(AnswerEntity a: answers){
                    if(a.getOptionId() == o.getOption_id()){
                        o.setCount(o.getCount()+1);
                    }
                }
            }
        }

        surveyStats.setStartTime(surveyEntity.getStartTime());
        surveyStats.setEndTime(surveyEntity.getEndTime());
        surveyStats.setNumOfParticipants(numberOfPart);
        surveyStats.setNumOfRegisteredUsers(numOfRegistered);
        surveyStats.setQuestions(questions);

        return new ResponseEntity(surveyStats, HttpStatus.OK);

    }
}