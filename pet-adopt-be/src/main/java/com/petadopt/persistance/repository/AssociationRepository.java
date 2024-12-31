package com.petadopt.persistance.repository;

import java.util.Optional;

import com.petadopt.persistance.entity.AssociationEntity;
import com.petadopt.persistance.entity.PetEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssociationRepository extends JpaRepository<AssociationEntity, Long> {

    Optional<AssociationEntity> findByName(String name);
}
