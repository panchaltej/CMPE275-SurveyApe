package com.cmpe275.termproject.model;


import javax.persistence.*;

@Entity
@Table(name = "open_unique_surveys")
public class OpenUniqueSurveyEntity {

    @Id
    @GeneratedValue
    @Column(name = "open_unique_survey_id")
    private Integer open_unique_survey_id;

    public Integer getOpen_unique_survey_id() {
        return open_unique_survey_id;
    }

    public void setOpen_unique_survey_id(Integer open_unique_survey_id) {
        this.open_unique_survey_id = open_unique_survey_id;
    }

    public String getInvitation_link() {
        return invitation_link;
    }

    public void setInvitation_link(String invitation_link) {
        this.invitation_link = invitation_link;
    }

    public String getIslinkused() {
        return islinkused;
    }

    public void setIslinkused(String islinkused) {
        this.islinkused = islinkused;
    }

    public SurveyEntity getSurvey_id() {
        return survey_id;
    }

    public void setSurvey_id(SurveyEntity survey_id) {
        this.survey_id = survey_id;
    }

    @Column(name = "invitation_link")
    private String invitation_link;

    @Column(name = "islinkused")
    private String islinkused;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "survey_id", nullable = false)
    private SurveyEntity survey_id;
}
