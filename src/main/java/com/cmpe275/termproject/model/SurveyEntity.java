package com.cmpe275.termproject.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;

import com.cmpe275.termproject.model.QuestionEntity;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "surveys")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="option_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SurveyEntity {

    @Id
    @GeneratedValue
    @Column(name = "survey_id")
    private Integer survey_id;

    @Column(name = "survey_name")
    private String survey_name;

    @Column(name = "is_published")
        private boolean is_published;

    public UserEntity getUser_id() {
        return user_id;
    }

    public void setUser_id(UserEntity user_id) {
        this.user_id = user_id;
    }

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey_id",orphanRemoval = true)
    private Set<QuestionEntity> questions = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user_id;


    public String getSurvey_type() {
        return survey_type;
    }

    public Set<QuestionEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<QuestionEntity> questions) {
        this.questions = questions;
    }

    public void setSurvey_type(String survey_type) {
        this.survey_type = survey_type;
    }

    @Column(name = "end_time")
    private Date end_time;

    @Column(name = "survey_type")
    private String survey_type;

    public Integer getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(Integer survey_id) {
        this.survey_id = survey_id;
    }

    public String getSurvey_name() {
        return survey_name;
    }

    public void setSurvey_name(String survey_name) {
        this.survey_name = survey_name;
    }

    public boolean isIs_published() {
        return is_published;
    }

    public void setIs_published(boolean is_published) {
        this.is_published = is_published;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public Set<ClosedSurveyEntity> getClosed_surveys() {
        return closed_surveys;
    }

    public void setClosed_surveys(Set<ClosedSurveyEntity> closed_surveys) {
        this.closed_surveys = closed_surveys;
    }

    @OneToMany(cascade = CascadeType.ALL,

            fetch = FetchType.LAZY,
            mappedBy = "surveyId",orphanRemoval = true)
    private Set<ClosedSurveyEntity> closed_surveys = new HashSet<>();
}
