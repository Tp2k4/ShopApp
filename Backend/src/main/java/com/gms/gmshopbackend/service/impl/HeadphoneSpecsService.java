package com.gms.gmshopbackend.service.impl;


import com.gms.gmshopbackend.model.HeadphoneSpecs;

import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.repository.HeadphoneSpecsRepository;

import com.gms.gmshopbackend.service.inter.IHeadphoneSpecsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HeadphoneSpecsService implements IHeadphoneSpecsService {
    private final HeadphoneSpecsRepository repository;

    @Override
    public HeadphoneSpecs updateHeadphoneSpecs(HeadphoneSpecs headphoneSpecs) {
        HeadphoneSpecs existing = repository.findById(headphoneSpecs.getId()).orElseThrow(
                () -> new RuntimeException("There is no mouse specs with id " + headphoneSpecs.getId())
        );
        existing.setBattery(headphoneSpecs.getBattery());
        existing.setConnectionType(headphoneSpecs.getConnectionType());
        existing.setColor(headphoneSpecs.getColor());
        existing.setHasMic(headphoneSpecs.isHasMic());
        existing.setNoiseCancelling(headphoneSpecs.isNoiseCancelling());
        existing.setWarranty(headphoneSpecs.getWarranty());
        existing.setWeight(headphoneSpecs.getWeight());


        HeadphoneSpecs updated =  repository.save(existing);
        return updated;
    }

    @Override
    public HeadphoneSpecs createHeadphoneSpecs(Product product, HeadphoneSpecs headphoneSpecs) {
        HeadphoneSpecs newHeadphoneSpecs = HeadphoneSpecs.builder()
                .color(headphoneSpecs.getColor())
                .battery(headphoneSpecs.getBattery())
                .warranty(headphoneSpecs.getWarranty())
                .hasMic(headphoneSpecs.isHasMic())
                .noiseCancelling(headphoneSpecs.isNoiseCancelling())
                .ConnectionType(headphoneSpecs.getConnectionType())
                .weight(headphoneSpecs.getWeight())
                .product(product)
                .build();

        return repository.save(newHeadphoneSpecs);
    }
}
