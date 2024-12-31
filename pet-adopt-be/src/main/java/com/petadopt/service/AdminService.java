package com.petadopt.service;

import java.util.Optional;

import com.petadopt.persistance.entity.UserEntity;
import com.petadopt.persistance.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void activateUser(Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        user.ifPresentOrElse(userEntity -> {
            userEntity.setIsActive(true);
            userRepository.save(userEntity);
        }, () -> log.error("User id {} not found.", userId));
    }

    public void deActivateUser(Long userId) {
        Optional<UserEntity> user = userRepository.findById(userId);
        user.ifPresentOrElse(userEntity -> {
            userEntity.setIsActive(false);
            userRepository.save(userEntity);
        }, () -> log.error("User id {} not found.", userId));
    }
}
