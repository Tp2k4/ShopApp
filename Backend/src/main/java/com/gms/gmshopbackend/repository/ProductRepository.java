package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.response.ProductResponse;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Qualifier("jpaProductRepository")
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Override
    Page<Product> findAll(Pageable pageable);

    boolean existsByName(String productName);

    Page<Product> findByCategoryId(Long categoryId, PageRequest pageRequest);

    Page<Product> findByNameContaining(String name, Pageable pageable);

    Product findByName(String name);
}
