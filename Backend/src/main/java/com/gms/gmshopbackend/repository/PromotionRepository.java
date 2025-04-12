package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    Promotion findByName(String name);
}
