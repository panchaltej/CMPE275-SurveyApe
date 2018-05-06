package com.cmpe275.termproject.model;


import javax.persistence.*;

@Entity
@Table(name = "open_surveys")
public class OpenSurveyEntity {

    @Id
    @GeneratedValue
    @Column(name = "open_survey_id")
    private Integer open_survey_id;

    @Column(name = "invitation_link")
    private String invitation_link;

    @Column(name = "islinkused", columnDefinition = "int default 0")
    private Integer islinkused;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "surveyId", nullable = false)
    private SurveyEntity surveyId;

    @Column(name = "uuid")
    private String uuid;

    @Column(name = "email_id")
    private String emailId;

    public Integer getOpen_survey_id() {
        return open_survey_id;
    }

    public void setOpen_survey_id(Integer open_survey_id) {
        this.open_survey_id = open_survey_id;
    }

    public String getInvitation_link() {
        return invitation_link;
    }

    public void setInvitation_link(String invitation_link) {
        this.invitation_link = invitation_link;
    }

    public SurveyEntity getSurvey_id() {
        return surveyId;
    }

    public void setSurvey_id(SurveyEntity survey_id) {
        this.surveyId = survey_id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Integer getIslinkused() {
        return islinkused;
    }

    public void setIslinkused(Integer islinkused) {
        this.islinkused = islinkused;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }
}
