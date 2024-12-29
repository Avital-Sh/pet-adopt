package com.petadopt.persistance.repository;

import java.util.Optional;

import com.petadopt.persistance.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUserName(String username);

    Optional<UserEntity> findByUserNameAndPassword(String username, String password);

}
