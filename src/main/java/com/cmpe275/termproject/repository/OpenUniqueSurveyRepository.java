package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.OpenSurveyEntity;
import com.cmpe275.termproject.model.OpenUniqueSurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OpenUniqueSurveyRepository extends JpaRepository<OpenUniqueSurveyEntity, Integer> {
}
