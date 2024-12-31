package com.petadopt.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.petadopt.facade.model.AddAssociationRequest;
import com.petadopt.facade.model.AssociationResponse;
import com.petadopt.facade.model.PetModel;
import com.petadopt.persistance.entity.AssociationEntity;
import com.petadopt.persistance.entity.UserEntity;
import com.petadopt.persistance.repository.AssociationRepository;
import com.petadopt.persistance.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AssociationService {

    private final AssociationRepository associationRepository;
    private final UserRepository userRepository;

    public AssociationService(AssociationRepository associationRepository, UserRepository userRepository) {
        this.associationRepository = associationRepository;
        this.userRepository = userRepository;
    }

    public void addAssociation(AddAssociationRequest addAssociationRequest, Principal principal) {
        String userName = principal.getName();
        AssociationEntity associationEntity = AssociationEntity.builder().name(addAssociationRequest.getName())
            .description(addAssociationRequest.getDescription()).build();

        associationRepository.save(associationEntity);
        Optional<UserEntity> user = userRepository.findByUserName(userName);
        if (user.isPresent()) {
            user.get().getAssociations().add(associationEntity);
            userRepository.save(user.get());
        }
    }

    public List<AssociationResponse> getAssociation(Principal principal) {
        String userName = principal.getName();
        Optional<UserEntity> user = userRepository.findByUserName(userName);
        return user.map(userEntity -> userEntity.getAssociations().stream()
            .map(associationEntity -> AssociationResponse.builder().id(associationEntity.getId()).name(associationEntity.getName())
                .pets(associationEntity.getPets().stream().map(petEntity -> PetModel.builder()
                    .id(petEntity.getId())
                    .age(petEntity.getAge())
                    .type(petEntity.getType())
                    .imageId(petEntity.getImageEntity().getId())
                    .imageUrl(petEntity.getImageEntity().getImageUrl())
                    .name(petEntity.getName())
                    .build()).toList())
                .description(associationEntity.getDescription()).build()).toList()).orElseGet(ArrayList::new);
    }

    public List<AssociationResponse> getAssociations() {
        return associationRepository.findAll().stream()
            .map(associationEntity -> AssociationResponse.builder().name(associationEntity.getName())
                .pets(associationEntity.getPets().stream().map(petEntity -> PetModel.builder()
                    .age(petEntity.getAge())
                    .type(petEntity.getType())
                    .imageId(petEntity.getImageEntity().getId())
                    .imageUrl(petEntity.getImageEntity().getImageUrl())
                    .name(petEntity.getName())
                    .build()).toList())
                .description(associationEntity.getDescription()).build()).toList();
    }

    public void deleteAssociation(Long id, String name) {
        Optional<UserEntity> user = userRepository.findByUserName(name);
        user.ifPresentOrElse(userEntity -> {
            Optional<AssociationEntity> association = userEntity.getAssociations().stream().findAny()
                .filter(associationEntity -> associationEntity.getId().equals(id));
            association.ifPresentOrElse(associationEntity -> {
                userEntity.getAssociations().remove(associationEntity);
                userRepository.save(userEntity);
                associationRepository.delete(associationEntity);
            }, () -> {
                throw new RuntimeException("No Association" + id);
            });
        }, () -> {
            throw new RuntimeException("No username " + name);
        });
    }
}
