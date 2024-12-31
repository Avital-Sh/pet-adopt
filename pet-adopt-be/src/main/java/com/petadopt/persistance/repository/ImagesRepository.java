package com.petadopt.persistance.repository;

import com.petadopt.persistance.entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagesRepository extends JpaRepository<ImageEntity, Long> {

}
