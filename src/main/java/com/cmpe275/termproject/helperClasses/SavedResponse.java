package com.cmpe275.termproject.helperClasses;

import com.cmpe275.termproject.model.QuestionEntity;
import com.cmpe275.termproject.view.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;

public class SavedResponse {
    @JsonView({SurveyResponse.summary.class})
    private Integer userId;
    @JsonView({SurveyResponse.summary.class})
    private Integer surveyId;
    @JsonView({SurveyResponse.summary.class})
    private List<QuestionEntity> questions;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Integer surveyId) {
        this.surveyId = surveyId;
    }

    public List<QuestionEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionEntity> questions) {
        this.questions = questions;
    }
}
