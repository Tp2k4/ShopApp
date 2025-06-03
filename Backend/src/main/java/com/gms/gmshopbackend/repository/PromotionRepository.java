package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Promotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface PromotionRepository extends JpaRepository<Promotion, Long> {

    Promotion findByName(String name);

    List<Promotion> findByEndDateBefore(LocalDate now);
}
