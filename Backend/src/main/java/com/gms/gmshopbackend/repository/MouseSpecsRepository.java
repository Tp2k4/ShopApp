package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.MouseSpecs;
import com.gms.gmshopbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MouseSpecsRepository extends JpaRepository<MouseSpecs, Long> {
    Optional<Object> findByProduct(Product product);
}
