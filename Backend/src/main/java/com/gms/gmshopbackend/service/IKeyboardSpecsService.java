package com.gms.gmshopbackend.service;


import com.gms.gmshopbackend.model.KeyboardSpecs;
import com.gms.gmshopbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IKeyboardSpecsService {
    public KeyboardSpecs updateKeyboardSpecs(KeyboardSpecs keyboardSpecs);
    public KeyboardSpecs createKeyboardSpecs(Product product, KeyboardSpecs keyboardSpecs);
}
