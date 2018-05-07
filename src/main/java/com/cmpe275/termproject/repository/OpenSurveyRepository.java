package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.ClosedSurveyEntity;
import com.cmpe275.termproject.model.OpenSurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenSurveyRepository  extends JpaRepository<OpenSurveyEntity, Integer> {
    OpenSurveyEntity findByUuid(String uuid);
}
