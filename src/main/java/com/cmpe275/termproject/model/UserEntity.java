package com.cmpe275.termproject.model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="user_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserEntity {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Integer user_id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "isvarified")
    private boolean isvarified;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "user_id",orphanRemoval = true)
    private Set<SurveyEntity> surveys = new HashSet<>();


    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getEmail_id() {
        return email;
    }

    public void setEmail_id(String email_id) {
        this.email = email_id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isIsvarified() {
        return isvarified;
    }

    public void setIsvarified(boolean isvarified) {
        this.isvarified = isvarified;
    }

    public String getVerification_number() {
        return verification_number;
    }

    public void setVerification_number(String verification_number) {
        this.verification_number = verification_number;
    }

    @Column(name = "verification_number")
    private String verification_number;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "inviteeUserId",orphanRemoval = true)
    private Set<ClosedSurveyEntity> closed_surveys = new HashSet<>();

    public Set<SurveyEntity> getSurveys() {
        return surveys;
    }

    public void setSurveys(Set<SurveyEntity> surveys) {
        this.surveys = surveys;
    }

    public Set<ClosedSurveyEntity> getClosed_surveys() {
        return closed_surveys;
    }

    public void setClosed_surveys(Set<ClosedSurveyEntity> closed_surveys) {
        this.closed_surveys = closed_surveys;
    }
}
