package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.OpenSurveyEntity;
import com.cmpe275.termproject.model.OpenUniqueSurveyEntity;
import com.cmpe275.termproject.model.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OpenUniqueSurveyRepository extends JpaRepository<OpenUniqueSurveyEntity, Integer> {
    List<OpenUniqueSurveyEntity> findAllBySurveyIdAndIslinkused(SurveyEntity surveyId, int isLinkUsed);
    List<OpenUniqueSurveyEntity> findAllBySurveyId(SurveyEntity surveyId);
    OpenUniqueSurveyEntity findOneByUuid(String uuid);
    OpenUniqueSurveyEntity findOneByEmailIdAndSurveyId(String emailId, SurveyEntity surveyEntity);

}
