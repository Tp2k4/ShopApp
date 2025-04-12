package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.model.Promotion;
import com.gms.gmshopbackend.model.PromotionProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PromotionProductRepository extends JpaRepository<PromotionProduct, Long> {
    List<PromotionProduct> findByPromotionId(Promotion existingPromotion);


    boolean existsByProductAndIsActiveTrue(Product exProduct);

    @Transactional
    void deletePromotionProductsByPromotionId(Promotion existingPromotion);
}
