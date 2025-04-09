package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.*;
import java.util.List;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    List<Object> findByProductId(Product productId);
}
