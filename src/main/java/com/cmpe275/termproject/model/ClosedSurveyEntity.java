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
    @JoinColumn(name = "surveyId",nullable = false)
    private SurveyEntity surveyId;

    @ManyToOne
    @JoinColumn(name = "inviteeUserId",nullable = false)
    private UserEntity inviteeUserId;

    @Column(name = "invitee_link")
    private String invitee_link;

    @Column(name = "islinkused", columnDefinition = "int default 0")
    private Integer islinkused;

    @Column(name = "uuid")
    private String uuid;

    public SurveyEntity getSurveyId() {
        return surveyId;
    }

    public void setSurveyId(SurveyEntity surveyId) {
        this.surveyId = surveyId;
    }

    public UserEntity getInviteeUserId() {
        return inviteeUserId;
    }

    public void setInviteeUserId(UserEntity inviteeUserId) {
        this.inviteeUserId = inviteeUserId;
    }

    public String getInvitee_link() {
        return invitee_link;
    }

    public void setInvitee_link(String invitee_link) {
        this.invitee_link = invitee_link;
    }

    public Integer getIslinkused() {
        return islinkused;
    }

    public void setIslinkused(Integer islinkused) {
        this.islinkused = islinkused;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUudi(String uuid) {
        this.uuid = uuid;
    }
}
