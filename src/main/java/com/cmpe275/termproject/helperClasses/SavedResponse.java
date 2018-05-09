package com.cmpe275.termproject.helperClasses;

import com.cmpe275.termproject.model.QuestionEntity;
import com.cmpe275.termproject.view.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;

public class SavedResponse {
    @JsonView({SurveyResponse.summary.class})
//    private Integer userId;
    private String userId;
    @JsonView({SurveyResponse.summary.class})
    private Integer surveyId;
    @JsonView({SurveyResponse.summary.class})
    private Integer emailId;
    @JsonView({SurveyResponse.summary.class})
    private List<QuestionEntity> questions;
    @JsonView({SurveyResponse.summary.class})
    private Integer isLinkUsed;


//    public Integer getUserId() {
//        return userId;
//    }
//
//    public void setUserId(Integer userId) {
//        this.userId = userId;
//    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
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

    public Integer getIsLinkUsed() {
        return isLinkUsed;
    }

    public void setIsLinkUsed(Integer isLinkUsed) {
        this.isLinkUsed = isLinkUsed;
    }
}
