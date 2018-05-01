package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository  extends JpaRepository<QuestionEntity, Integer> {

//    void deleteBySurvey_Id(int survey_id);
}
