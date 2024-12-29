package com.petadopt.service;

import java.util.List;
import java.util.Optional;

import com.petadopt.facade.model.Pet;
import com.petadopt.persistance.entity.AssociationEntity;
import com.petadopt.persistance.entity.ImageEntity;
import com.petadopt.persistance.entity.PetEntity;
import com.petadopt.persistance.repository.AssociationRepository;
import com.petadopt.persistance.repository.ImagesRepository;
import com.petadopt.persistance.repository.PetRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class PetService {

    private final PetRepository petRepository;
    private final ImagesRepository imagesRepository;
    private final AssociationRepository associationRepository;

    public PetService(PetRepository petRepository, ImagesRepository imagesRepository,
                      AssociationRepository associationRepository) {
        this.petRepository = petRepository;
        this.imagesRepository = imagesRepository;
        this.associationRepository = associationRepository;
    }

    public List<Pet> getAllPets() {
        List<PetEntity> petEntities = petRepository.findAll();
        return petEntities.stream()
            .map(petEntity ->
                Pet.builder()
                    .type(petEntity.getType())
                    .age(petEntity.getAge())
                    .imageId(petEntity.getImageEntity().getId())
                    .imageUrl(petEntity.getImageEntity().getImageUrl())
                    .name(petEntity.getName())
                    .build())
            .toList();
    }

    public void addPet(Pet petModel) {
        ImageEntity petImage = imagesRepository.getReferenceById(petModel.getImageId());
        Optional<AssociationEntity> associationEntityOptional =
            associationRepository.findByName(petModel.getAssociationName());
        if (associationEntityOptional.isPresent()) {
            PetEntity petToAdd =
                PetEntity.builder()
                    .age(petModel.getAge())
                    .name(petModel.getName())
                    .type(petModel.getType())
                    .imageEntity(petImage)
                    .association(associationEntityOptional.get())
                    .build();
            petRepository.save(petToAdd);
            associationEntityOptional.get().getPets().add(petToAdd);
            associationRepository.save(associationEntityOptional.get());
            log.info("The lovely {} {} added successfully", petModel.getType(), petModel.getName());
        } else {
            log.error("No such association as {}", petModel.getAssociationName());
        }


    }

}
