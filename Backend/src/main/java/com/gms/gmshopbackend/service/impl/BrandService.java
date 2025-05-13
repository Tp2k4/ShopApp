package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.model.Brand;
import com.gms.gmshopbackend.repository.BrandRepository;
import com.gms.gmshopbackend.service.inter.IBrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.InvalidParameterException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class BrandService implements IBrandService {

    private final BrandRepository brandRepository;

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    @Override
    public Brand addBrand(String brandName) {
        if (brandRepository.existsByName(brandName)){
            throw new InvalidParameterException("Brand " + brandName + " already exists");
        }
        try {
            Brand brand = new Brand();
            brand.setName(brandName);
            return brandRepository.save(brand);
        }catch (Exception e){
            throw new RuntimeException("Brand " + brandName + " already exists");
        }
    }

    @Override
    public Brand updateBrand(Brand brand) {
        return null;
    }

    @Override
    public Brand deleteBrand(Brand brand) {
        return null;
    }
}
