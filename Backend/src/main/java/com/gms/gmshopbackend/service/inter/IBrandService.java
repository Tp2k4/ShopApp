package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.model.Brand;

import java.util.List;

public interface IBrandService {
    public List<Brand> getAllBrands();
    public Brand addBrand(String brandName);
    public Brand updateBrand(Brand brand);
    public Brand deleteBrand(Brand brand);
}
