package com.cmpe275.termproject.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private Integer userid;

    @Column(name = "survey_id")
    private Integer surveyid;

    @Column(name = "question_id")
    private Integer questionid;

    @Column(name = "option_id")
    private Integer optionid;

    @Column(name = "answer_description")
    private String answerdescription;


    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Integer getSurveyid() {
        return surveyid;
    }

    public void setSurveyid(Integer surveyid) {
        this.surveyid = surveyid;
    }

    public Integer getQuestionid() {
        return questionid;
    }

    public void setQuestionid(Integer questionid) {
        this.questionid = questionid;
    }

    public Integer getOptionid() {
        return optionid;
    }

    public void setOptionid(Integer optionid) {
        this.optionid = optionid;
    }

    public String getAnswerdescription() {
        return answerdescription;
    }

    public void setAnswerdescription(String answerdescription) {
        this.answerdescription = answerdescription;
    }
}
