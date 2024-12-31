package com.petadopt.facade.model;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class PetModel {

    private Long id;
    private String name;
    private String type;
    private Integer age;
    private Long imageId;
    private String imageUrl;
    private String description;
    private String sex;
    private String breed;
    private String health;
    private String associationName;

}
