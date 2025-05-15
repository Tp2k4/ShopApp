package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.ProductDTO;
import com.gms.gmshopbackend.model.HeadphoneSpecs;
import com.gms.gmshopbackend.model.Product;

public interface IHeadphoneSpecsService{
    public HeadphoneSpecs updateHeadphoneSpecs(HeadphoneSpecs headphoneSpecs);
    public HeadphoneSpecs createHeadphoneSpecs(Product product, ProductDTO productDTO);
}
