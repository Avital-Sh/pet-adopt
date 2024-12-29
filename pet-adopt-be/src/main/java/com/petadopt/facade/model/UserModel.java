package com.petadopt.facade.model;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserModel {

    private String username;
    private String email;
    private List<String> roles;
}
