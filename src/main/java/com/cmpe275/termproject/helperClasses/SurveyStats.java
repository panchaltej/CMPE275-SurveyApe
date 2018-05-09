package com.cmpe275.termproject.helperClasses;

import com.cmpe275.termproject.model.QuestionEntity;
import com.cmpe275.termproject.view.Stats;
import com.cmpe275.termproject.view.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonView;

import java.util.Date;
import java.util.List;

public class SurveyStats {
    @JsonView({Stats.summary.class})
    private String surveyName;
    @JsonView({Stats.summary.class})
    private Date startTime;
    @JsonView({Stats.summary.class})
    private Date endTime;
    @JsonView({Stats.summary.class})
    private float numOfParticipants;
    @JsonView({Stats.summary.class})
    private float numOfRegisteredUsers;
    @JsonView({Stats.summary.class})
    private float participationRate;
    @JsonView({Stats.summary.class})
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
