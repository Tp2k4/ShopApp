package com.gms.gmshopbackend.service.inter;


import com.gms.gmshopbackend.dtos.ProductDTO;
import com.gms.gmshopbackend.model.KeyboardSpecs;
import com.gms.gmshopbackend.model.Product;

public interface IKeyboardSpecsService {
    public KeyboardSpecs updateKeyboardSpecs(Long id, KeyboardSpecs keyboardSpecs);
    public KeyboardSpecs createKeyboardSpecs(Product product, ProductDTO productDTO);
}
