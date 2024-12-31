package com.petadopt.persistance.repository;

import com.petadopt.persistance.entity.AdoptionApplyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdoptionApplyRepository extends JpaRepository<AdoptionApplyEntity, Long> {
}
