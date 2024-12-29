package com.petadopt.facade.model;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLoginResponse {
    private List<String> roles;
    private String bearerToken;
}
