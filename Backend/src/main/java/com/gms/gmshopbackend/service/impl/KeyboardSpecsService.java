package com.gms.gmshopbackend.service.impl;


import com.gms.gmshopbackend.dtos.ProductDTO;
import com.gms.gmshopbackend.model.KeyboardSpecs;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.repository.KeyboardSpecsRepository;
import com.gms.gmshopbackend.service.inter.IKeyboardSpecsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KeyboardSpecsService implements IKeyboardSpecsService {
    private final KeyboardSpecsRepository repository;

    @Override
    public KeyboardSpecs updateKeyboardSpecs(Long id, KeyboardSpecs keyboardSpecs) {
        KeyboardSpecs existing = repository.findById(id).orElseThrow(
                () -> new RuntimeException("There is no mouse specs with id " + keyboardSpecs.getId())
        );
        existing.setBattery(keyboardSpecs.getBattery());
        existing.setConnectionType(keyboardSpecs.getConnectionType());
        existing.setColor(keyboardSpecs.getColor());
        existing.setNumKeys(keyboardSpecs.getNumKeys());
        existing.setSwitchType(keyboardSpecs.getSwitchType());
        existing.setWarranty(keyboardSpecs.getWarranty());
        existing.setWeight(keyboardSpecs.getWeight());
        existing.setLed(keyboardSpecs.isLed());


        KeyboardSpecs updated =  repository.save(existing);
        return updated;
    }

    @Override
    public KeyboardSpecs createKeyboardSpecs(Product product, ProductDTO productDTO) {
        KeyboardSpecs newKeyboardSpecs = KeyboardSpecs.builder()
                .led(productDTO.isLed())
                .color(productDTO.getColor())
                .battery(productDTO.getBattery())
                .connectionType(productDTO.getConnectionType())
                .numKeys((long)productDTO.getNumKeys())
                .switchType(productDTO.getSwitchType())
                .warranty(productDTO.getWarranty())
                .weight(productDTO.getWeight())
                .product(product)
                .build();

        return repository.save(newKeyboardSpecs);
    }
}
