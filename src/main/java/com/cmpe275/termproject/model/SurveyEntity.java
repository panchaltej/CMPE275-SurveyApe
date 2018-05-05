package com.cmpe275.termproject.model;

import com.cmpe275.termproject.view.Survey;
import com.fasterxml.jackson.annotation.*;

import com.cmpe275.termproject.model.QuestionEntity;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "surveys")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="survey_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SurveyEntity {

    @Id
    @GeneratedValue
    @Column(name = "survey_id")
    @JsonView({Survey.summary.class})
    private Integer survey_id;

    @Column(name = "survey_name")
    @JsonView({Survey.summary.class})
    private String survey_name;

    @Column(name = "is_published")
    @JsonView({Survey.summary.class})
        private boolean ispublished;

    public UserEntity getUser_id() {
        return userid;
    }

    public void setUser_id(UserEntity user_id) {
        this.userid = user_id;
    }

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "survey_id",orphanRemoval = true)
    @JsonView({Survey.summary.class})
    private Set<QuestionEntity> questions = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserEntity userid;


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
    @JsonView({Survey.summary.class})
    private Date end_time;

    @Column(name = "survey_type")
    @JsonView({Survey.summary.class})
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
        return ispublished;
    }

    public void setIs_published(boolean is_published) {
        this.ispublished = is_published;
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
            mappedBy = "survey_id",orphanRemoval = true)
    @JsonIgnore
    private Set<ClosedSurveyEntity> closed_surveys = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "survey_id")
    @JsonIgnore
    private OpenSurveyEntity open_survey_link;

    @OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "survey_id")
    @JsonIgnore
    private OpenUniqueSurveyEntity open_Unique_Survey_link;
}
