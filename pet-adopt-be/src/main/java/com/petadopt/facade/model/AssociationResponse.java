package com.petadopt.facade.model;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AssociationResponse {

    private Long id;
    private String name;
    private String description;
    private List<Pet> pets;

}
