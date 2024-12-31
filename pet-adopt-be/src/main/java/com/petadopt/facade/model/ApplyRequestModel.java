package com.petadopt.facade.model;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplyRequestModel {

    private Long id;
    private String fullName;
    private String petName;
    private String email;
    private String phoneNumber;
    private String requestDescription;
    private String requestStatus;
    private LocalDateTime postedTime;

}
