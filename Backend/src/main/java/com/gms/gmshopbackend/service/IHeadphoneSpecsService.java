package com.gms.gmshopbackend.service;

import com.gms.gmshopbackend.model.HeadphoneSpecs;
import com.gms.gmshopbackend.model.MouseSpecs;
import com.gms.gmshopbackend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IHeadphoneSpecsService{
    public HeadphoneSpecs updateHeadphoneSpecs(HeadphoneSpecs headphoneSpecs);
    public HeadphoneSpecs createHeadphoneSpecs(Product product, HeadphoneSpecs headphoneSpecs);
}
