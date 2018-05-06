package com.cmpe275.termproject.repository;

import com.cmpe275.termproject.model.SurveyEntity;
import com.cmpe275.termproject.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Integer>{
    List<UserEntity> findByEmail(String email);
    UserEntity findOneByEmail(String email);
}
