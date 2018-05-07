package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.QuestionEntity;
import com.cmpe275.termproject.model.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository  extends JpaRepository<QuestionEntity, Integer> {

//    void deleteBySurvey_Id(int survey_id);
    List<QuestionEntity> findAllBySurveyId(SurveyEntity surveyId);
}
