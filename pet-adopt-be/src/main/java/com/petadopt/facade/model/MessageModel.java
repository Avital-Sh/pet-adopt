package com.petadopt.facade.model;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MessageModel {

    private String message;
    private String author;
    private LocalDateTime postedTime;
}
