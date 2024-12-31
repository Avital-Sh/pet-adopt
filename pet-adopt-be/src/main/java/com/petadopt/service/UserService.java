package com.petadopt.service;

import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.petadopt.facade.model.RegistrationRequest;
import com.petadopt.facade.model.UserLoginRequest;
import com.petadopt.facade.model.UserLoginResponse;
import com.petadopt.facade.model.UserModel;
import com.petadopt.persistance.entity.UserEntity;
import com.petadopt.persistance.entity.UserRoleEntity;
import com.petadopt.persistance.repository.RoleRepository;
import com.petadopt.persistance.repository.UserRepository;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void register(RegistrationRequest request) {
        UserRoleEntity userRole;

        if (userRepository.findByUserName(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        Optional<UserEntity> userRoleDb = userRepository.findByUserName(request.getUsername());
        if (userRoleDb.isPresent()) {
            userRole = userRoleDb.get().getUserRole();
        } else {
            userRole = roleRepository.save(UserRoleEntity.builder().role("USER").build());
        }
        UserEntity user = UserEntity.builder()
            .userRole(userRole)
            .isActive(false)
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .userName(request.getUsername())
            .email(request.getEmail())
            .password(passwordEncoder.encode(request.getPassword()))
            .build();
        userRepository.save(user);
    }

    public UserLoginResponse login(UserLoginRequest userLoginRequest) throws NoResourceFoundException {
        // Find the user by username
        Optional<UserEntity> user = userRepository.findByUserName(userLoginRequest.getUsername());
        if (user.isEmpty()) {
            throw new NoResourceFoundException(HttpMethod.POST, "User not found");
        }

        // Validate the password
        UserEntity foundUser = user.get();
        if (!passwordEncoder.matches(userLoginRequest.getPassword(), foundUser.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        if (Boolean.FALSE.equals(foundUser.getIsActive()) || foundUser.getIsActive() == null) {
            throw new IllegalArgumentException("User is in-active, please contact the admin.");

        }

        // Generate a Base64-encoded token (not recommended for production)
        String token = Base64.getEncoder().encodeToString(
            (userLoginRequest.getUsername() + ":" + userLoginRequest.getPassword()).getBytes()
        );

        return UserLoginResponse.builder().bearerToken(token)
            .roles(Collections.singletonList(foundUser.getUserRole().getRole())).build();
    }

    public UserModel getUserByUserName(String username) throws NoResourceFoundException {
        Optional<UserEntity> user = userRepository.findByUserName(username);
        if (user.isEmpty()) {
            throw new NoResourceFoundException(HttpMethod.GET, "/user/currentUser");
        }
        return UserModel.builder().roles(Collections.singletonList(user.get().getUserRole().getRole()))
            .email(user.get().getEmail()).username(user.get().getUserName()).firstName(user.get().getFirstName())
            .lastName(user.get()
                .getLastName()).build();
    }

    public List<UserModel> getAllUsers() {
        List<UserEntity> allUsers = userRepository.findAll();
        return allUsers.stream().filter(userEntity -> !"ADMIN".equalsIgnoreCase(userEntity.getUserRole().getRole()))
            .map(userEntity -> UserModel
                .builder()
                .id(userEntity.getId())
                .email(userEntity.getEmail())
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .roles(Collections.singletonList(userEntity.getUserRole().getRole()))
                .username(userEntity.getUserName())
                .isActive(userEntity.getIsActive())
                .build()).toList();
    }
}
