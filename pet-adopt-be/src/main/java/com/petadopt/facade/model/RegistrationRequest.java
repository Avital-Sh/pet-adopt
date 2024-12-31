package com.petadopt.facade.model;

import lombok.Data;

@Data
public class RegistrationRequest {

    private String firstName;
    private String lastName;
    private String username;
    private String password;
    private String email;

}
