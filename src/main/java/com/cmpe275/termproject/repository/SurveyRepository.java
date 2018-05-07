package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.SurveyEntity;
import com.cmpe275.termproject.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface SurveyRepository  extends JpaRepository<SurveyEntity, Integer> {

    //SurveyEntity findBySurvey_nameAndUser_id(String Survey_name,int User_id);
    List<SurveyEntity> findByIspublishedAndUserid (boolean is_published,UserEntity user_id);
    List<SurveyEntity> findByUserid (UserEntity user_id);

    List<SurveyEntity> findBySurveytype (String surveytype);

    List<SurveyEntity> findByUseridAndEndTimeGreaterThan (UserEntity user_id, Date date);

}
