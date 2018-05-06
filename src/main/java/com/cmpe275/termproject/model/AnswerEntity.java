package com.cmpe275.termproject.model;

import com.cmpe275.termproject.view.SurveyResponse;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

@Entity
@Table(name = "answers")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="answer_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AnswerEntity {
    @Id
    @GeneratedValue
    @Column(name = "answer_id")
    private Integer answer_id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "survey_id")
    private Integer surveyId;

    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "option_id")
    @JsonView({SurveyResponse.summary.class})
    private Integer optionId;

    @Column(name = "answer_description")
    @JsonView({SurveyResponse.summary.class})
    private String answerDescription;


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

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Integer getOptionId() {
        return optionId;
    }

    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
    }

    public String getAnswerdescription() {
        return answerDescription;
    }

    public void setAnswerdescription(String answerdescription) {
        this.answerDescription = answerdescription;
    }

    public Integer getAnswer_id() {
        return answer_id;
    }

    public void setAnswer_id(Integer answer_id) {
        this.answer_id = answer_id;
    }
}
