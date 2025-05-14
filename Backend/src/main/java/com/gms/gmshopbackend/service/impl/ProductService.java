package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.ProductDTO;
import com.gms.gmshopbackend.dtos.ProductImageDTO;
import com.gms.gmshopbackend.model.*;
import com.gms.gmshopbackend.repository.*;
import com.gms.gmshopbackend.response.ProductNameResponse;
import com.gms.gmshopbackend.response.ProductResponse;
import com.gms.gmshopbackend.service.inter.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.security.InvalidParameterException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final MouseSpecsRepository mouseSpecsRepository;
    private final HeadphoneSpecsRepository headphoneSpecsRepository;
    private final KeyboardSpecsRepository keyboardSpecsRepository;
    private final MouseSpecsService mouseSpecsService;
    private final HeadphoneSpecsService headphoneSpecsService;
    private final KeyboardSpecsService keyboardSpecsService;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;
    private final BrandRepository brandRepository;


    @Override
    public Page<ProductResponse> getAllProducts(PageRequest pageRequest) {
        Page<Product> productPage =  productRepository.findAll(pageRequest);
        return productPage.map(ProductResponse::fromProduct);

    }

    @Override
    public Product getProductById(Long id) {
        try {
            Product existingProduct = productRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Product not found")
            );

            return existingProduct;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Product createProduct(ProductDTO productDTO) {
        // Kiểm tra nếu sản phẩm đã tồn tại
        if (productRepository.existsByName(productDTO.getName())) {
            throw new RuntimeException("Product existed: " + productDTO.getName());
        }
        Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(
                () -> new RuntimeException("Category not found")
        );

        Brand brand = brandRepository.findById(productDTO.getBrandId()).orElseThrow(
                () -> new RuntimeException("Brand not found")
        );



        // Tạo đối tượng Product từ DTO
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        product.setCategory(category);
        product.setBrand(brand);
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setThumbnail(productDTO.getThumbnail());

        Product savedProduct = productRepository.save(product);

        if (productDTO.getMouseSpecsId() != null) {
            MouseSpecs newMouseSpecs = mouseSpecsService
                    .createMouseSpecs(savedProduct, productDTO.getMouseSpecsId());
            savedProduct.setMouseSpecs(newMouseSpecs);
        }

        if (productDTO.getKeyboardSpecsId() != null) {
            KeyboardSpecs newKeyboardSpecs = keyboardSpecsService
                    .createKeyboardSpecs(savedProduct, productDTO.getKeyboardSpecsId());
            savedProduct.setKeyboardSpecs(newKeyboardSpecs);
        }

        if (productDTO.getHeadphoneSpecsId() != null) {
            HeadphoneSpecs newHeadphoneSpecs = headphoneSpecsService
                    .createHeadphoneSpecs(savedProduct, productDTO.getHeadphoneSpecsId());
            savedProduct.setHeadphoneSpecs(newHeadphoneSpecs);
        }

        try {
            // Lưu vào database
            Product newProduct = productRepository.save(savedProduct);
            return newProduct;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override

    public Product updateProduct(Long id, ProductDTO productDTO) {

        try {
            Product existing_product = productRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Product not found")
            );


            existing_product.setName(productDTO.getName());
            existing_product.setPrice(productDTO.getPrice());
            existing_product.setDescription(productDTO.getDescription());
            existing_product.setStockQuantity(productDTO.getStockQuantity());
            existing_product.setThumbnail(productDTO.getThumbnail());


            if (productDTO.getMouseSpecsId() != null) {
                existing_product.setMouseSpecs(productDTO.getMouseSpecsId());
                mouseSpecsRepository.save(mouseSpecsService.updateMouseSpecs(productDTO.getMouseSpecsId()));
            } else if (existing_product.getKeyboardSpecs() != null) {
                existing_product.setKeyboardSpecs(productDTO.getKeyboardSpecsId());
                keyboardSpecsRepository.save(keyboardSpecsService.updateKeyboardSpecs(productDTO.getKeyboardSpecsId()));
            } else {
                existing_product.setHeadphoneSpecs(productDTO.getHeadphoneSpecsId());
                headphoneSpecsRepository.save(headphoneSpecsService.updateHeadphoneSpecs(productDTO.getHeadphoneSpecsId()));
            }


            // Lưu vào database
            Product updatedProduct = productRepository.save(existing_product);
            return updatedProduct;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public void deleteProduct(int id) {


    }

    @Override
    public Page<ProductResponse> getProductsByCategoryId(Long categoryId, PageRequest pageRequest) {
        return productRepository.findByCategoryId(categoryId, pageRequest).map(ProductResponse::fromProduct);
    }

    @Override
    public Page<ProductResponse> searchProducts(String keyword, PageRequest pageRequest) {
        return productRepository.findByNameContaining(keyword, pageRequest).map(ProductResponse::fromProduct);
    }

    @Override
    public List<ProductImage> uploadProductImage(Long productId, List<ProductImageDTO> productImageDTOs) throws Exception {
        Product existing_product = productRepository.findById(productId).orElseThrow(
                () -> new RuntimeException("Product not found")
        );

        int size = productImageRepository.findByProductId(existing_product).size();

        if (size + productImageDTOs.size() > ProductImage.MAX_IMAGE_PER_PRODUCT) {
            throw new InvalidParameterException("You only can upload " + (ProductImage.MAX_IMAGE_PER_PRODUCT - size) + " images");
        }

        List<ProductImage> productImages = new ArrayList<>();
        for (ProductImageDTO productImageDTO : productImageDTOs) {
            ProductImage productImage = ProductImage.builder()
                    .productId(existing_product)
                    .imageUrl(productImageDTO.getImageUrl())
                    .build();

            productImages.add(productImage);

        }

        return productImageRepository.saveAll(productImages);

    }

    @Override
    public List<ProductNameResponse> getProductNames() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(ProductNameResponse::fromProduct).collect(Collectors.toList());
    }
}
