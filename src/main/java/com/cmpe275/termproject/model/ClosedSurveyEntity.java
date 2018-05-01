package com.cmpe275.termproject.model;

import javax.persistence.*;

@Entity
@Table(name = "closed_surveys")
public class ClosedSurveyEntity {

    @Id
    @GeneratedValue
    @Column(name = "closed_survey_id")
    private Integer closed_survey_id;

    @ManyToOne
    @JoinColumn(name = "survey_id",nullable = false)
    private SurveyEntity survey_id;

    @ManyToOne
    @JoinColumn(name = "invitee_user_id",nullable = false)
    private UserEntity invitee_user_id;

    @Column(name = "invitee_link")
    private String invitee_link;

    @Column(name = "islinkused")
    private String islinkused;

    public SurveyEntity getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(SurveyEntity survey_id) {
        this.survey_id = survey_id;
    }

    public UserEntity getInvitee_user_id() {
        return invitee_user_id;
    }

    public void setInvitee_user_id(UserEntity invitee_user_id) {
        this.invitee_user_id = invitee_user_id;
    }

    public String getInvitee_link() {
        return invitee_link;
    }

    public void setInvitee_link(String invitee_link) {
        this.invitee_link = invitee_link;
    }

    public String getIslinkused() {
        return islinkused;
    }

    public void setIslinkused(String islinkused) {
        this.islinkused = islinkused;
    }





}
