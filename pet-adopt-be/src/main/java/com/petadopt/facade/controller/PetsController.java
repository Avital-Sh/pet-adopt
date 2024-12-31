package com.petadopt.facade.controller;

import java.io.IOException;
import java.util.List;

import com.petadopt.facade.model.ImageUploadResponse;
import com.petadopt.facade.model.PetModel;
import com.petadopt.service.ImageService;
import com.petadopt.service.PetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@CrossOrigin(origins = "*") // Allow all origins
@RequestMapping("/pets")
public class PetsController {

    private final PetService petService;
    private final ImageService imageService;

    public PetsController(PetService petService, ImageService imageService) {
        this.petService = petService;
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<List<PetModel>> getAllPets() {
        log.info("Fetching all pets.");
        return ResponseEntity.ok(petService.getAllPets());
    }

    @PostMapping("/addPet")
    public void addPet(@RequestBody PetModel pet) {
        log.info("Adding pet, {}", pet.toString());
        petService.addPet(pet);
    }

    @PostMapping("/addPet/uploadImage")
    public ResponseEntity<ImageUploadResponse> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            return ResponseEntity.ok(imageService.uploadImage(file));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
