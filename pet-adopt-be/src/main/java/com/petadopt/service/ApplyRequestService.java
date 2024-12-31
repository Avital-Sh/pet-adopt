package com.petadopt.service;

import java.security.Principal;
import java.util.List;

import com.petadopt.facade.model.ApplyRequestModel;
import com.petadopt.facade.model.AssociationResponse;
import com.petadopt.facade.model.PetModel;
import com.petadopt.persistance.entity.AdoptionApplyEntity;
import com.petadopt.persistance.repository.AdoptionApplyRepository;
import com.petadopt.persistance.repository.PetRepository;
import jakarta.persistence.EntityExistsException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ApplyRequestService {

    private static final Logger log = LoggerFactory.getLogger(ApplyRequestService.class);
    private final AdoptionApplyRepository adoptionApplyRepository;
    private final AssociationService associationService;
    private final PetRepository petRepository;

    public ApplyRequestService(AdoptionApplyRepository adoptionApplyRepository, AssociationService associationService,
                               PetRepository petRepository) {
        this.adoptionApplyRepository = adoptionApplyRepository;
        this.associationService = associationService;
        this.petRepository = petRepository;
    }

    public List<ApplyRequestModel> getApplyRequests(Principal principal) {
        List<AssociationResponse> currentUserAssociations = associationService.getAssociation(principal);
        List<AdoptionApplyEntity> adoptionApplyEntities =
            currentUserAssociations.stream().flatMap(associationResponse -> associationResponse.getPets().stream())
                .flatMap(petModel -> petRepository.findById(petModel.getId()).stream())
                .flatMap(petEntity -> petEntity.getAdoptionApplyEntities().stream()).toList();


        return adoptionApplyEntities.stream().map(adoptionApplyEntity -> ApplyRequestModel.builder()
                .requestDescription(adoptionApplyEntity.getRequestDescription())
                .petName(adoptionApplyEntity.getPet().getName())
                .requestStatus(adoptionApplyEntity.getRequestStatus()).id(adoptionApplyEntity.getId())
                .email(adoptionApplyEntity.getEmail()).phoneNumber(adoptionApplyEntity.getPhoneNumber())
                .postedTime(adoptionApplyEntity.getPostedTime()).fullName(adoptionApplyEntity.getFullName()).build())
            .toList();
    }

    public void applyAdoption(ApplyRequestModel applyRequestModel, Long petId) {
        AdoptionApplyEntity applyEntity = AdoptionApplyEntity.builder()
            .email(applyRequestModel.getEmail())
            .fullName(applyRequestModel.getFullName())
            .phoneNumber(applyRequestModel.getPhoneNumber())
            .requestDescription(applyRequestModel.getRequestDescription())
            .requestStatus("Pending")
            .build();
        adoptionApplyRepository.save(applyEntity);

        petRepository.findById(petId).ifPresent(pet -> {
            pet.getAdoptionApplyEntities().add(applyEntity);
            petRepository.save(pet);
            applyEntity.setPet(pet);
            adoptionApplyRepository.save(applyEntity);
        });

    }

    public void acceptAdoptApplication(Long applyId, Principal principal) {
        adoptionApplyRepository.findById(applyId).ifPresentOrElse((adoptApplication) -> {
            List<AssociationResponse> userAssociations = associationService.getAssociation(principal);
            List<PetModel> pets =
                userAssociations.stream().flatMap(associationResponse -> associationResponse.getPets().stream())
                    .toList();

            pets.stream().filter(petModel -> petModel.getId().equals(adoptApplication.getPet().getId())).findAny()
                .ifPresentOrElse(pet -> {
                    adoptApplication.setRequestStatus("Accept");
                    adoptionApplyRepository.save(adoptApplication);
                }, () -> {
                    throw new RuntimeException(
                        "Pet not belong to this association, you cannot accept pet adoption request that are not from your association");
                });

        }, () ->
        {
            log.error("Could not find the application request.");
            throw new EntityExistsException();
        });
    }

    public void rejectAdoptApplication(Long applyId, Principal principal) {
        adoptionApplyRepository.findById(applyId).ifPresentOrElse(adoptApplication -> {
            List<AssociationResponse> userAssociations = associationService.getAssociation(principal);
            List<PetModel> pets =
                userAssociations.stream().flatMap(associationResponse -> associationResponse.getPets().stream())
                    .toList();

            pets.stream().filter(petModel -> petModel.getId().equals(adoptApplication.getPet().getId())).findAny()
                .ifPresentOrElse(pet -> {
                    adoptApplication.setRequestStatus("Reject");
                    adoptionApplyRepository.save(adoptApplication);
                }, () -> {
                    throw new RuntimeException(
                        "Pet not belong to this association, you cannot reject pet adoption request that are not from your association");
                });

        }, () ->
        {
            log.error("Could not find the application request.");
            throw new EntityExistsException();
        });
    }
}
