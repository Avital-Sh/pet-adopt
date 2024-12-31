package com.petadopt.facade.model;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserModel {

    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private List<String> roles;
    private Boolean isActive;
}
