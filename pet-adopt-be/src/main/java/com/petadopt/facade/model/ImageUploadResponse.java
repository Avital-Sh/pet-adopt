package com.petadopt.facade.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ImageUploadResponse {
    private Long imageId;
    private String status;
}
