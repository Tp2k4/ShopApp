package com.gms.gmshopbackend.controller;


import com.gms.gmshopbackend.dtos.PromotionDTO;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.model.Promotion;
import com.gms.gmshopbackend.model.PromotionProduct;
import com.gms.gmshopbackend.repository.ProductRepository;
import com.gms.gmshopbackend.repository.PromotionProductRepository;
import com.gms.gmshopbackend.repository.PromotionRepository;
import com.gms.gmshopbackend.response.PromotionResponse;
import com.gms.gmshopbackend.service.impl.PromotionService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;

import java.util.*;

@RestController
@RequestMapping("${api.prefix}/promotion")
@RequiredArgsConstructor

public class PromotionController {

    private final PromotionService promotionService;
    private final PromotionRepository promotionRepository;
    private final ProductRepository productRepository;
    private final PromotionProductRepository promotionProductRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createPromotion(@RequestBody PromotionDTO promotionDTO) {
        try{
            Promotion promotion = promotionService.createPromotion(promotionDTO);
            return  ResponseEntity.status(HttpStatus.CREATED).body(promotion);
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @PostMapping("set-promotion/{promotionId}")
    public ResponseEntity<?> setPromotion(@PathVariable Long promotionId) {
        try{
            Promotion promotion = promotionService.setPromotion(promotionId);
            return ResponseEntity.status(HttpStatus.OK).body(promotion);

        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update-promotion/{promotionId}")
    public ResponseEntity<?> updatePromotion(@PathVariable Long promotionId, @RequestBody PromotionDTO promotionDTO) {
        try{
            Promotion promotion = promotionService.updatePromotion(promotionId, promotionDTO);
            return ResponseEntity.status(HttpStatus.OK).body(promotion);
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllPromotions() {
        try{
            List<PromotionResponse> promotions = promotionService.getAllPromotions();
            return ResponseEntity.status(HttpStatus.OK).body(promotions);
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping(value = "/upload-promotion-img/{promotionId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadPromotionThumbnail(@PathVariable Long promotionId,
                                                      @RequestParam("thumbnail") MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("No image uploaded");
            }

            if (file.getSize() > 10 * 1024 * 1024) {
                return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                        .body("You cannot upload an image larger than 10MB");
            }

            if (!isImageFile(file)) {
                return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                        .body("File must be an image");
            }

            Promotion promotion = promotionService.getPromotionById(promotionId);
            if (promotion == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Promotion not found");
            }

            String fileName = storePromotionFile(file);
            promotion.setThumbnail(fileName);
            promotionRepository.save(promotion);

            return ResponseEntity.ok("Thumbnail uploaded successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error uploading file: " + e.getMessage());
        }
    }

    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        return contentType != null && contentType.startsWith("image");
    }

    private String storePromotionFile(MultipartFile file) throws IOException {
        if (!isImageFile(file) || file.getOriginalFilename() == null) {
            throw new IOException("Invalid image file");
        }

        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;

        Path uploadDir = Paths.get("upload/promotion");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        Path destination = uploadDir.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

        return uniqueFileName;
    }

    @Scheduled(fixedRate = 300000)
    @Transactional
    public void checkExpiredPromotions() {
        LocalDate now = LocalDate.now();

        // Tìm promotion còn active nhưng đã hết hạn
        List<Promotion> expiredPromotions = (List<Promotion>) promotionRepository.findByEndDateBefore(now);
        if (!expiredPromotions.isEmpty()) {
            List<Product> products = new ArrayList<>();
            for (Promotion promotion : expiredPromotions) {
                promotion.setStatus("inactive");
                List<PromotionProduct> proList = promotionProductRepository.findByPromotionId(promotion);
                for (PromotionProduct promotionProduct : proList) {
                    Optional<Product> pro = productRepository.findById(promotionProduct.getProduct().getId());
                    if (pro.isPresent()) {
                        pro.get().setDiscountPercent(null);
                        products.add(pro.get());
                    }
                }
            }
            productRepository.saveAll(products);
            promotionRepository.saveAll(expiredPromotions);

            System.out.println("Checked and updated expired promotions at " + now);
        }
    }

}
