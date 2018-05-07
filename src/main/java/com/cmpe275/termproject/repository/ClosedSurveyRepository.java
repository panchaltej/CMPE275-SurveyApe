package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.ClosedSurveyEntity;
import com.cmpe275.termproject.model.OptionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClosedSurveyRepository extends JpaRepository<ClosedSurveyEntity, Integer> {
    ClosedSurveyEntity findByUuid(String uuid);
}
