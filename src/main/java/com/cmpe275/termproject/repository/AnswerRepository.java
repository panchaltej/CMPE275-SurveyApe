package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<AnswerEntity, Integer> {
    void deleteByEmailIdAndSurveyId(String EmailId, Integer SurveyId);
}
