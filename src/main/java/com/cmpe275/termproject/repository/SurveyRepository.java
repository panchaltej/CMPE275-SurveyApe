package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.SurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SurveyRepository  extends JpaRepository<SurveyEntity, Integer> {

    //SurveyEntity findBySurvey_nameAndUser_id(String Survey_name,int User_id);
}
