package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.ProductPromotionDTO;
import com.gms.gmshopbackend.dtos.PromotionDTO;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.model.Promotion;
import com.gms.gmshopbackend.model.PromotionProduct;
import com.gms.gmshopbackend.model.PromotionStatus;
import com.gms.gmshopbackend.repository.ProductRepository;
import com.gms.gmshopbackend.repository.PromotionProductRepository;
import com.gms.gmshopbackend.repository.PromotionRepository;
import com.gms.gmshopbackend.response.PromotionResponse;
import com.gms.gmshopbackend.service.inter.IPromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class PromotionService implements IPromotionService {

    private final PromotionRepository promotionRepository;
    private final ProductRepository productRepository;
    private final PromotionProductRepository promotionProductRepository;

    @Override
    public List<PromotionResponse> getAllPromotions() {
        try {
                List<Promotion> promotions = promotionRepository.findAll();

                return promotions.stream().map(promotion -> {
                    List<ProductPromotionDTO> productList = promotionProductRepository.findByPromotionId(promotion).stream()
                            .map(p -> new ProductPromotionDTO(
                                    p.getProduct().getName(),
                                    p.getDiscountPercent()
                            ))
                            .collect(Collectors.toList());

                    return new PromotionResponse(
                            promotion.getId(),
                            promotion.getName(),
                            promotion.getType(),
                            promotion.getStatus(),
                            promotion.getStartDate(),
                            promotion.getEndDate(),
                            productList
                    );
                }).collect(Collectors.toList());


        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public Promotion createPromotion(PromotionDTO promotionDTO) {
        Promotion existingPromotion = promotionRepository.findByName(promotionDTO.getName());
        if (existingPromotion != null) {
            throw new RuntimeException("Promotion already exists");
        }
        Promotion promotion = Promotion.builder()
                .name(promotionDTO.getName())
                .type(promotionDTO.getType())
                .startDate(promotionDTO.getStartDate())
                .endDate(promotionDTO.getEndDate())
                .build();

        if(LocalDate.now().isAfter(promotion.getStartDate()) && LocalDate.now().isBefore(promotion.getEndDate())) {
            promotion.setStatus(String.valueOf(PromotionStatus.ACTIVE));
        }else{
            promotion.setStatus(String.valueOf(PromotionStatus.INACTIVE));
        }
        promotionRepository.save(promotion);
        List<ProductPromotionDTO> listProducts = promotionDTO.getListProduct();
        List<PromotionProduct> newListProducts = new ArrayList<>();
        List<Product> newProducts = new ArrayList<>();
        for (ProductPromotionDTO productPromotionDTO : listProducts) {
            Product exProduct = productRepository.findByName(productPromotionDTO.getProductName());
            if (promotionProductRepository.existsByProductAndIsActiveTrue(exProduct)) {
                throw new RuntimeException("Product is already active in another promotion");
            }
            PromotionProduct promoProduct = PromotionProduct.builder()
                    .promotionId(promotion)
                    .product(exProduct)
                    .discountPercent(productPromotionDTO.getDiscountPercent())
                    .isActive(false)
                    .build();

            newListProducts.add(promoProduct);
            if(promotion.getStatus().equals(String.valueOf(PromotionStatus.ACTIVE))) {
                exProduct.setDiscountPercent(productPromotionDTO.getDiscountPercent());
                newProducts.add(exProduct);
            }

        }
        promotionProductRepository.saveAll(newListProducts);
        productRepository.saveAll(newProducts);
        return promotion;

    }

    @Override
    public Promotion updatePromotion(Long id, PromotionDTO promotionDTO) {
        try {
            Promotion existingPromotion = promotionRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Promotion not found")
            );
            existingPromotion.setName(promotionDTO.getName());
            existingPromotion.setType(promotionDTO.getType());
            existingPromotion.setStartDate(promotionDTO.getStartDate());
            existingPromotion.setEndDate(promotionDTO.getEndDate());
            existingPromotion.setStatus(String.valueOf(PromotionStatus.INACTIVE));

            promotionRepository.save(existingPromotion);

            List<ProductPromotionDTO> listProducts = promotionDTO.getListProduct();
            List<PromotionProduct> newListProducts = new ArrayList<>();
            promotionProductRepository.deletePromotionProductsByPromotionId(existingPromotion);
            List<PromotionProduct> oldList = promotionProductRepository.findByPromotionId(existingPromotion);

            // Map cũ: productId -> PromotionProduct
            Map<Long, PromotionProduct> oldMap = oldList.stream()
                    .collect(Collectors.toMap(p -> p.getProduct().getId(), p -> p));

            // Danh sách để cập nhật/thêm/xóa
            List<PromotionProduct> toSave = new ArrayList<>();
            Set<String> incomingProductIds = new HashSet<>();

            for (ProductPromotionDTO dto : promotionDTO.getListProduct()) {
                String productName = dto.getProductName();
                incomingProductIds.add(productName);

                Product exProduct = productRepository.findByName(productName);

                // Kiểm tra có promotion khác đang active không
                if (!oldMap.containsKey(productName) && promotionProductRepository.existsByProductAndIsActiveTrue(exProduct)) {
                    throw new RuntimeException("Product ID " + productName + " is already in an active promotion");
                }

                // Nếu đã có → cập nhật discount nếu khác
                if (oldMap.containsKey(productName)) {
                    PromotionProduct existing = oldMap.get(productName);
                    if (existing.getDiscountPercent().compareTo(dto.getDiscountPercent()) != 0) {
                        existing.setDiscountPercent(dto.getDiscountPercent());
                        toSave.add(existing);
                    }
                    oldMap.remove(productName); // Bỏ ra khỏi danh sách cần xóa
                } else {
                    // Chưa có → thêm mới
                    PromotionProduct newPP = PromotionProduct.builder()
                            .promotionId(existingPromotion)
                            .product(exProduct)
                            .discountPercent(dto.getDiscountPercent())
                            .isActive(false)
                            .build();
                    toSave.add(newPP);
                }
            }

            // Xóa những product cũ không còn trong danh sách mới
            if (!oldMap.isEmpty()) {
                promotionProductRepository.deleteAll(oldMap.values());
            }

            // Lưu các bản ghi cần cập nhật/thêm mới
            promotionProductRepository.saveAll(toSave);
            return existingPromotion;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deletePromotion(Long id) {

    }

    @Override
    public Promotion setPromotion(Long id) {
        Promotion existingPromotion = promotionRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Promotion not found")
        );
        if (existingPromotion.getEndDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Promotion is outdated");
        }

        existingPromotion.setStatus(existingPromotion.getStatus().equals("inactive") ? "active" : "inactive");
        List<PromotionProduct> proProductList = promotionProductRepository.findByPromotionId(existingPromotion);
        List<PromotionProduct> newListProducts = new ArrayList<>();
        List<Product> updatedListProducts = new ArrayList<>();
        for (PromotionProduct promotionProduct : proProductList) {
            Product exProduct = promotionProduct.getProduct();
            if (existingPromotion.getStatus().equals("inactive")) {
                exProduct.setDiscountPercent(BigDecimal.ZERO);
            } else {
                if (promotionProductRepository.existsByProductAndIsActiveTrue(exProduct)) {
                    throw new RuntimeException("Product is already active in another promotion");
                }
                exProduct.setDiscountPercent(promotionProduct.getDiscountPercent());
            }
            updatedListProducts.add(exProduct);
            promotionProduct.setIsActive(!promotionProduct.getIsActive());
            newListProducts.add(promotionProduct);
        }
        promotionProductRepository.saveAll(newListProducts);
        productRepository.saveAll(updatedListProducts);
        promotionRepository.save(existingPromotion);
        return existingPromotion;
    }

    public Promotion getPromotionById(Long promotionId) {
        try{
            Promotion promotion = promotionRepository.findById(promotionId).orElseThrow(
                    () -> new RuntimeException("Promotion not found")
            );
            return promotion;
            }catch(Exception e){
            throw new RuntimeException(e);
        }
    }
}
