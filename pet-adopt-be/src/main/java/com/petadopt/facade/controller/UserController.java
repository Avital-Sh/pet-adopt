package com.petadopt.facade.controller;

import java.security.Principal;

import com.petadopt.facade.model.RegistrationRequest;
import com.petadopt.facade.model.UserLoginRequest;
import com.petadopt.facade.model.UserLoginResponse;
import com.petadopt.facade.model.UserModel;
import com.petadopt.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestController
@CrossOrigin(origins = "*") // Allow all origins
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService registrationService) {
        this.userService = registrationService;
    }

    @GetMapping("/currentUser")
    public ResponseEntity<UserModel> getUser(Principal principal) throws NoResourceFoundException {
        principal.getName();
        UserModel user = userService.getUserByUserName(principal.getName());

        return ResponseEntity.ok(user);

    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody RegistrationRequest registrationRequest) {
        try {
            userService.register(registrationRequest);
        } catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatusCode.valueOf(409)).body("User already exist");
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@RequestBody UserLoginRequest userLoginRequest)
        throws NoResourceFoundException {
        UserLoginResponse loginResponse = userService.login(UserLoginRequest
            .builder()
            .username(userLoginRequest.getUsername())
            .password(userLoginRequest.getPassword())
            .build());

        return ResponseEntity.ok(
            loginResponse);
    }
}
