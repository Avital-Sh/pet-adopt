package com.petadopt.persistance.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "adoption_apply")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AdoptionApplyEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "fullName", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @Column(name = "requestDescription", nullable = false, length = 1000)
    private String requestDescription;

    @Column(name = "requestStatus", nullable = false)
    private String requestStatus;

    @ManyToOne
    private PetEntity pet;

    @CreationTimestamp
    @Column(name = "postedTime", nullable = false, updatable = false)
    private LocalDateTime postedTime;

}
