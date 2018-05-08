package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.ClosedSurveyEntity;
import com.cmpe275.termproject.model.OpenSurveyEntity;
import com.cmpe275.termproject.model.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OpenSurveyRepository  extends JpaRepository<OpenSurveyEntity, Integer> {
    OpenSurveyEntity findByUuid(String uuid);
    List<OpenSurveyEntity> findAllBySurveyId(SurveyEntity surveyId);
}
