package com.petadopt.facade.controller;

import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.List;
import java.util.Objects;

import com.petadopt.facade.model.ImageUploadResponse;
import com.petadopt.facade.model.Pet;
import com.petadopt.persistance.entity.ImageEntity;
import com.petadopt.persistance.repository.ImagesRepository;
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
    private final ImagesRepository repository;

    public PetsController(PetService petService, ImagesRepository repository) {
        this.petService = petService;
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<Pet>> getAllPets() {
        log.info("Fetching all pets.");
        return ResponseEntity.ok(petService.getAllPets());
    }

    @PostMapping("/addPet")
    public void addPet(@RequestBody Pet pet) {
        log.info("Adding pet, {}", pet.toString());
        petService.addPet(pet);
    }

    @PostMapping("/addPet/uploadImage")
    public ResponseEntity<ImageUploadResponse> uploadImage(@RequestParam("file") MultipartFile file) {


        log.info(file.getName());
        if (file.isEmpty()) {
            return ResponseEntity.ok(ImageUploadResponse.builder().status("ERROR").build());
        }

        try {
            String uploadDir = new File("src/main/resources/static/images").getAbsolutePath();
            ImageEntity imageEntity = repository.save(ImageEntity.builder().build());
            String suffix = Objects.requireNonNull(file.getOriginalFilename()).split("\\.")[1];
            File targetFile = new File(MessageFormat.format("{0}/{1}.{2}", uploadDir, imageEntity.getId(), suffix));
            file.transferTo(targetFile);
            imageEntity.setImageUrl(MessageFormat.format("{0}/{1}.{2}", "images", imageEntity.getId(), suffix));
            repository.save(imageEntity);
            return ResponseEntity.ok(ImageUploadResponse.builder().imageId(imageEntity.getId()).status("OK").build());
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
