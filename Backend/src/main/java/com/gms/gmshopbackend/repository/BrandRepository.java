package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    boolean existsByName(String brandName);


    Brand findByName(String brandId);
}
