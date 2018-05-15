package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.AnswerEntity;
import com.cmpe275.termproject.model.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<AnswerEntity, Integer> {
    void deleteByEmailIdAndSurveyId(String EmailId, Integer SurveyId);
    AnswerEntity findBySurveyId(int survey_id);
    List<AnswerEntity> findAllBySurveyId(int survey_id);
    List<AnswerEntity> findAllByEmailIdAndSurveyId(String EmailId, Integer SurveyId);
}
