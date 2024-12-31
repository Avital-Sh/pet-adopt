package com.petadopt.service;

import java.io.File;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Objects;

import com.petadopt.facade.model.ImageUploadResponse;
import com.petadopt.persistance.entity.ImageEntity;
import com.petadopt.persistance.repository.ImagesRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class ImageService {

    private final ImagesRepository imagesRepository;
    private final String baseImageFolderPath;
    private final String folderName;

    public ImageService(ImagesRepository imagesRepository, @Value("${images.base.path}") String baseImageFolderPath,
                        @Value("${images.base.folder.name}") String folderName) {
        this.imagesRepository = imagesRepository;
        this.baseImageFolderPath = baseImageFolderPath;
        this.folderName = folderName;
    }

    public ImageUploadResponse uploadImage(MultipartFile file) throws IOException {
        log.info(file.getName());
        try {
            String uploadDir = new File(baseImageFolderPath + folderName).getAbsolutePath();
            ImageEntity imageEntity = imagesRepository.save(ImageEntity.builder().build());
            String suffix = Objects.requireNonNull(file.getOriginalFilename()).split("\\.")[1];
            File targetFile = new File(MessageFormat.format("{0}/{1}.{2}", uploadDir, imageEntity.getId(), suffix));
            file.transferTo(targetFile);
            imageEntity.setImageUrl(MessageFormat.format("{0}/{1}.{2}", folderName, imageEntity.getId(), suffix));
            imagesRepository.save(imageEntity);
            return ImageUploadResponse.builder().imageId(imageEntity.getId()).build();
        } catch (Exception e) {
            log.error("Failed to upload image..");
            throw e;
        }
    }
}
