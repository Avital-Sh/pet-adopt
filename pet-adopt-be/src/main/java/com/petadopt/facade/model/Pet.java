package com.petadopt.facade.model;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class Pet {

    private String name;
    private String type;
    private Integer age;
    private Long imageId;
    private String imageUrl;
    private String associationName;

}
