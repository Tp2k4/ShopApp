package com.gms.gmshopbackend.service.inter;


import com.gms.gmshopbackend.model.KeyboardSpecs;
import com.gms.gmshopbackend.model.Product;

public interface IKeyboardSpecsService {
    public KeyboardSpecs updateKeyboardSpecs(KeyboardSpecs keyboardSpecs);
    public KeyboardSpecs createKeyboardSpecs(Product product, KeyboardSpecs keyboardSpecs);
}
