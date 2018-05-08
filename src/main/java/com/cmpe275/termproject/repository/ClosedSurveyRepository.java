package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.ClosedSurveyEntity;
import com.cmpe275.termproject.model.OptionsEntity;
import com.cmpe275.termproject.model.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClosedSurveyRepository extends JpaRepository<ClosedSurveyEntity, Integer> {
    ClosedSurveyEntity findByUuid(String uuid);
    List<ClosedSurveyEntity> findAllBySurveyIdAndIslinkused(SurveyEntity surveyId, int isLinkUsed);
    List<ClosedSurveyEntity> findAllBySurveyId(SurveyEntity surveyId);
    ClosedSurveyEntity findOneByUuid(String uuid);
}
