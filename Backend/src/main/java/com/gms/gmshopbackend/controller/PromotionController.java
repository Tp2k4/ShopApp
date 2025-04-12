package com.gms.gmshopbackend.controller;

import com.gms.gmshopbackend.dtos.PromotionDTO;
import com.gms.gmshopbackend.model.Promotion;
import com.gms.gmshopbackend.service.impl.PromotionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/promotion")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class PromotionController {

    private final PromotionService promotionService;

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
            List<Promotion> promotions = promotionService.getAllPromotions();
            return ResponseEntity.status(HttpStatus.OK).body(promotions);
        }catch (Exception e){
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
