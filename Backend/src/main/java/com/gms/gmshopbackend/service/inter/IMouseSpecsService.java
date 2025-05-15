package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.ProductDTO;
import com.gms.gmshopbackend.model.MouseSpecs;
import com.gms.gmshopbackend.model.Product;

public interface IMouseSpecsService {
    public MouseSpecs updateMouseSpecs(MouseSpecs mouseSpecs);
    public MouseSpecs createMouseSpecs(Product product, ProductDTO productDTO);
}
