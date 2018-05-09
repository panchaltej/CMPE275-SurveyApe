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

    @Column(name = "email_id")
    @JsonView({SurveyResponse.summary.class})
    private String emailId;

    @Column(name = "surveyId")
    private Integer surveyId;

//    @Column(name = "question_id")
//    private Integer questionId;

    @ManyToOne
    @JoinColumn(name = "question_id",nullable = false)
    private QuestionEntity questionId;

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

    public String getEmailId() { return emailId; }

    public void setEmailId(String emailId) { this.emailId = emailId; }

    public Integer getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Integer surveyId) {
        this.surveyId = surveyId;
    }

    public QuestionEntity getQuestionId() {
        return questionId;
    }

    public void setQuestionId(QuestionEntity questionId) {
        this.questionId = questionId;
    }

    public String getAnswerDescription() {
        return answerDescription;
    }

    public void setAnswerDescription(String answerDescription) {
        this.answerDescription = answerDescription;
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
