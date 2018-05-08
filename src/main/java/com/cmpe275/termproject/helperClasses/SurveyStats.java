package com.cmpe275.termproject.helperClasses;

import com.cmpe275.termproject.model.QuestionEntity;
import com.cmpe275.termproject.view.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonView;

import java.util.Date;
import java.util.List;

public class SurveyStats {
    private String surveyName;

    private Date startTime;

    private Date endTime;

    private float numOfParticipants;

    private float numOfRegisteredUsers;

    private float participationRate;

    private List<QuestionEntity> questions;

    public String getSurveyName() {
        return surveyName;
    }

    public void setSurveyName(String surveyName) {
        this.surveyName = surveyName;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public float getNumOfParticipants() {
        return numOfParticipants;
    }

    public void setNumOfParticipants(float numOfParticipants) {
        this.numOfParticipants = numOfParticipants;
    }

    public float getNumOfRegisteredUsers() {
        return numOfRegisteredUsers;
    }

    public void setNumOfRegisteredUsers(float numOfRegisteredUsers) {
        this.numOfRegisteredUsers = numOfRegisteredUsers;
    }

    public float getParticipationRate() {
        return numOfParticipants/numOfRegisteredUsers;
    }

    public List<QuestionEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionEntity> questions) {
        this.questions = questions;
    }
}
