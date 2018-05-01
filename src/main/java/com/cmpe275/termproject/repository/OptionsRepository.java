package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.OptionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OptionsRepository  extends JpaRepository<OptionsEntity, Integer> {

    //void deleteByQuestion_Id(int question_id);
}
