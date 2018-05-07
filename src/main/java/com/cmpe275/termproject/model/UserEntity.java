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
/*@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="user_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})*/
public class UserEntity {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Integer id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "isVerified")
    private String isVerified = "N";

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "userid",orphanRemoval = true)
    private Set<SurveyEntity> surveys = new HashSet<>();

    @Column(name = "verification_number")
    private String verificationCode;

    @OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy = "inviteeUserId",orphanRemoval = true)
    private Set<ClosedSurveyEntity> closed_surveys = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIsVerified() {
        return isVerified;
    }

    public void setIsVerified(String isVerified) {
        this.isVerified = isVerified;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
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
