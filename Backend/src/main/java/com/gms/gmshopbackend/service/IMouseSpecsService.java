package com.gms.gmshopbackend.service;

import com.gms.gmshopbackend.model.MouseSpecs;
import com.gms.gmshopbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IMouseSpecsService {
    public MouseSpecs updateMouseSpecs(MouseSpecs mouseSpecs);
    public MouseSpecs createMouseSpecs(Product product, MouseSpecs mouseSpecs);
}
