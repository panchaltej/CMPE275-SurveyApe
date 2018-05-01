package com.cmpe275.termproject.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.cmpe275.termproject.model.SurveyEntity;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "questions")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="question_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class QuestionEntity {

    @Id
    @GeneratedValue
    @Column(name = "question_id")
    private Integer question_id;

    @Column(name = "question_type")
    private String question_type;

    @Column(name = "question_text")
    private String question_text;

    @ManyToOne
    @JoinColumn(name = "survey_id",nullable = false)
    private SurveyEntity survey_id;

    public Set<OptionsEntity> getOptions() {
        return options;
    }

    public void setOptions(Set<OptionsEntity> options) {
        this.options = options;
    }

    @OneToMany(cascade = CascadeType.ALL,

            fetch = FetchType.LAZY,
            mappedBy = "question_id",orphanRemoval = true)
    private Set<OptionsEntity> options = new HashSet<>();

    public Integer getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(Integer question_id) {
        this.question_id = question_id;
    }

    public String getQuestion_type() {
        return question_type;
    }

    public void setQuestion_type(String question_type) {
        this.question_type = question_type;
    }

    public String getQuestion_text() {
        return question_text;
    }

    public void setQuestion_text(String question_text) {
        this.question_text = question_text;
    }

    public SurveyEntity getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(SurveyEntity survey_id) {
        this.survey_id = survey_id;
    }




}
