package com.cmpe275.termproject.model;

import com.cmpe275.termproject.view.Survey;
import com.fasterxml.jackson.annotation.*;

import com.cmpe275.termproject.model.QuestionEntity;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "surveys")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="surveyId")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class SurveyEntity {

    @Id
    @GeneratedValue
    @Column(name = "surveyId")
    @JsonView({Survey.summary.class})
    private Integer surveyId;

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


//    public Set<UserEntity> getUserid() {
//        return userid;
//    }
//
//    public void setUserid(Set<UserEntity> userid) {
//        this.userid = userid;
//    }

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "surveyId",orphanRemoval = true)
    @JsonView({Survey.summary.class})
    private Set<QuestionEntity> questions = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserEntity userid;

//    @ManyToMany(fetch = FetchType.LAZY,
//            cascade = {
//                    CascadeType.PERSIST,
//                    CascadeType.MERGE
//            })
//    @JoinTable(name = "user_survey",
//            joinColumns = { @JoinColumn(name = "post_id",referencedColumnName="surveyId"), },
//            inverseJoinColumns = { @JoinColumn(name = "tag_id",referencedColumnName="user_id" ), })
//    private Set<UserEntity> userid = new HashSet<>();


    public String getSurvey_type() {
        return surveytype;
    }

    public Set<QuestionEntity> getQuestions() {
        return questions;
    }

    public void setQuestions(Set<QuestionEntity> questions) {
        this.questions = questions;
    }

    public void setSurvey_type(String survey_type) {
        this.surveytype = survey_type;
    }

    public boolean isIspublished() {
        return ispublished;
    }

    public void setIspublished(boolean ispublished) {
        this.ispublished = ispublished;
    }

    @Column(name = "end_time")
    @JsonView({Survey.summary.class})

    private Date endTime;

    @Column(name = "start_time")
    @JsonView({Survey.summary.class})
    private Date startTime;

    @Column(name = "survey_type")
    @JsonView({Survey.summary.class})
    private String surveytype;

    public Integer getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(Integer surveyId) {
        this.surveyId = surveyId;
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

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
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
    @JsonView({Survey.summary.class})
    private Set<ClosedSurveyEntity> closed_surveys = new HashSet<>();

    @OneToOne(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "surveyId")
    @JsonIgnore
    private OpenSurveyEntity open_survey_link;


    @OneToMany(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL, orphanRemoval = true,
            mappedBy = "surveyId")
    @JsonIgnore
    private Set<OpenUniqueSurveyEntity> open_Unique_Survey_link = new HashSet<>();

    public String getClosed() {
        return closed;
    }

    public void setClosed(String closed) {
        this.closed = closed;
    }

    @Column(name = "closed")
    @JsonView({Survey.summary.class})
    private String closed;
}
