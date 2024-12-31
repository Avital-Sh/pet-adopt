package com.petadopt.persistance.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "Pet")
@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PetEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "age")
    private Integer age;

    @Column(name = "health")
    private String health;

    @Column(name = "description")
    private String description;

    @Column(name = "breed")
    private String breed;

    @Column(name = "sex")
    private String sex;

    @OneToOne
    private ImageEntity imageEntity;

    @ManyToOne
    private AssociationEntity association;

    @OneToMany
    private List<AdoptionApplyEntity> adoptionApplyEntities;


}
