package com.cmpe275.termproject.model;

import com.cmpe275.termproject.view.Survey;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "options")
@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="option_id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class OptionsEntity {
    public QuestionEntity getQuestion_id() {
        return question_id;
    }

    public void setQuestion_id(QuestionEntity question_id) {
        this.question_id = question_id;
    }

    @Id
    @GeneratedValue
    @Column(name = "option_id")
    @JsonView({Survey.summary.class})
    private Integer option_id;

    @Column(name = "option_description")
    @JsonView({Survey.summary.class})
    private String option_description;

    @ManyToOne
    @JoinColumn(name = "question_id",nullable = false)
    private QuestionEntity question_id;

    public Integer getOption_id() {
        return option_id;
    }

    public void setOption_id(Integer option_id) {
        this.option_id = option_id;
    }

    public String getOption_description() {
        return option_description;
    }

    public void setOption_description(String option_description) {
        this.option_description = option_description;
    }
}
