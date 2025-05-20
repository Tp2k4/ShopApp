package com.gms.gmshopbackend.service.impl;


import com.gms.gmshopbackend.dtos.ProductDTO;
import com.gms.gmshopbackend.model.MouseSpecs;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.repository.MouseSpecsRepository;
import com.gms.gmshopbackend.service.inter.IMouseSpecsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MouseSpecsService implements IMouseSpecsService {
    private final MouseSpecsRepository repository;

    @Override
    public MouseSpecs updateMouseSpecs(Long id, MouseSpecs mouseSpecs) {
        MouseSpecs existing = repository.findById(id).orElseThrow(
                () -> new NoSuchElementException("No such mousespecs with id: " + id)
        );
        existing.setBattery(mouseSpecs.getBattery());
        existing.setLed(mouseSpecs.isLed());
        existing.setColor(mouseSpecs.getColor());
//        existing.setProduct(mouseSpecs.getProduct());
        existing.setMaxDpi(mouseSpecs.getMaxDpi());
        existing.setWarranty(mouseSpecs.getWarranty());
        existing.setWeight(mouseSpecs.getWeight());
        existing.setConnectionType(mouseSpecs.getConnectionType());

        MouseSpecs updated =  repository.save(existing);
        return updated;
    }

    @Override
    public MouseSpecs createMouseSpecs(Product product, ProductDTO productDTO) {
        MouseSpecs newMouseSpecs = MouseSpecs.builder()
                .led(productDTO.isLed())
                .product(product)
                .battery(productDTO.getBattery())
                .color(productDTO.getColor())
                .maxDpi(productDTO.getMaxDpi())
                .warranty(productDTO.getWarranty())
                .weight(productDTO.getWeight())
                .connectionType(productDTO.getConnectionType())
                .build();

        return repository.save(newMouseSpecs);
    }
}
