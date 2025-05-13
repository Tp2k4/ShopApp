package com.gms.gmshopbackend.controller;

import com.gms.gmshopbackend.model.Brand;
import com.gms.gmshopbackend.service.impl.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @PostMapping("/add-brand")
    public ResponseEntity<?> addBrand(@RequestParam("brand") String brandName) {
        try{
            Brand brand = brandService.addBrand(brandName);
            return ResponseEntity.ok(brand);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllBrands() {
        try{
            List<Brand> brands = brandService.getAllBrands();
            return ResponseEntity.ok(brands);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
