package com.petadopt.facade.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddAssociationRequest {

    private String name;
    private String description;

}
