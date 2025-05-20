package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.ProductDTO;
import com.gms.gmshopbackend.dtos.ProductImageDTO;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.model.ProductImage;
import com.gms.gmshopbackend.response.ProductNameResponse;
import com.gms.gmshopbackend.response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface IProductService {
    public Page<ProductResponse> getAllProducts(PageRequest pageRequest);
    public Product getProductById(Long id);
    public Product createProduct(ProductDTO product);
    public Product updateProduct(Long id, ProductDTO product);
    public void deleteProduct(Long id);
    public Page<ProductResponse> getProductsByCategoryId(Long categoryId, PageRequest pageRequest);
    public Page<ProductResponse> searchProducts(String keyword, PageRequest pageRequest);
    public List<ProductImage> uploadProductImage(Long productId, List<ProductImageDTO> productImageDTO) throws Exception;
    public List<ProductNameResponse> getProductNames();
    public List<ProductImage> updateProductImages(Long ProductId, List<ProductImageDTO> productImageDTO) throws Exception;
}

