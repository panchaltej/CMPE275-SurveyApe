package com.cmpe275.termproject.model;

import com.cmpe275.termproject.view.Survey;
import com.cmpe275.termproject.view.SurveyResponse;
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
    @JsonView({Survey.summary.class, SurveyResponse.summary.class})
    @Column(name = "question_id")
    private Integer question_id;

    @Column(name = "question_type")
    @JsonView({Survey.summary.class, SurveyResponse.summary.class})
    private String question_type;

    @Column(name = "question_text")
    @JsonView({Survey.summary.class, SurveyResponse.summary.class})
    private String question_text;

    @ManyToOne
    @JoinColumn(name = "surveyId",nullable = false)
    private SurveyEntity surveyId;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "question_id",orphanRemoval = true)
    @JsonView({Survey.summary.class, SurveyResponse.summary.class})
    private Set<OptionsEntity> options = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "questionId",orphanRemoval = true)
    @JsonView({Survey.summary.class, SurveyResponse.summary.class})
    private Set<AnswerEntity> answers = new HashSet<>();

    public Set<OptionsEntity> getOptions() {
        return options;
    }

    public void setOptions(Set<OptionsEntity> options) {
        this.options = options;
    }

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

    public SurveyEntity getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(SurveyEntity surveyId) {
        this.surveyId = surveyId;
    }

    public Set<AnswerEntity> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<AnswerEntity> answers) {
        this.answers = answers;
    }
}
