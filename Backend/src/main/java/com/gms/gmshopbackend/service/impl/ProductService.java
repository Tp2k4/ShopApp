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

        if (product.getCategory().getName().equalsIgnoreCase("Mouse") ) {
            MouseSpecs newMouseSpecs = mouseSpecsService
                    .createMouseSpecs(savedProduct, productDTO);
            savedProduct.setMouseSpecs(newMouseSpecs);
        }

        if (product.getCategory().getName().equalsIgnoreCase("Keyboard")) {
            KeyboardSpecs newKeyboardSpecs = keyboardSpecsService
                    .createKeyboardSpecs(savedProduct, productDTO);
            savedProduct.setKeyboardSpecs(newKeyboardSpecs);
        }

        if (product.getCategory().getName().equalsIgnoreCase("Headphone")) {
            HeadphoneSpecs newHeadphoneSpecs = headphoneSpecsService
                    .createHeadphoneSpecs(savedProduct, productDTO);
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

            Category category = categoryRepository.findById(productDTO.getCategoryId()).orElseThrow(
                    () -> new RuntimeException("Category not found")
            );

            if (category.getName().equalsIgnoreCase("Mouse")) {
                MouseSpecs newMouse = MouseSpecs.builder()
                        .product(existing_product)
                        .led(productDTO.isLed())
                        .maxDpi(productDTO.getMaxDpi())
                        .color(productDTO.getColor())
                        .battery(productDTO.getBattery())
                        .warranty(productDTO.getWarranty())
                        .weight(productDTO.getWeight())
                        .connectionType(productDTO.getConnectionType())
                        .build();
                existing_product.setMouseSpecs(newMouse);
                mouseSpecsRepository.save(mouseSpecsService.updateMouseSpecs(newMouse));
            } else if (category.getName().equalsIgnoreCase("Keyboard")) {
                KeyboardSpecs newKeyBoard = KeyboardSpecs.builder()
                        .product(existing_product)
                        .led(productDTO.isLed())
                        .numKeys(productDTO.getNumKeys())
                        .color(productDTO.getColor())
                        .battery(productDTO.getBattery())
                        .warranty(productDTO.getWarranty())
                        .weight(productDTO.getWeight())
                        .connectionType(productDTO.getConnectionType())
                        .switchType(productDTO.getSwitchType())
                        .build();
                existing_product.setKeyboardSpecs(newKeyBoard);
                keyboardSpecsRepository.save(keyboardSpecsService.updateKeyboardSpecs(newKeyBoard));
            } else {
                HeadphoneSpecs newHeadphone = HeadphoneSpecs.builder()
                        .product(existing_product)
                        .noiseCancelling(productDTO.isNoiseCancelling())
                        .hasMic(productDTO.isHasMic())
                        .color(productDTO.getColor())
                        .battery(productDTO.getBattery())
                        .warranty(productDTO.getWarranty())
                        .weight(productDTO.getWeight())

                        .build();
                existing_product.setHeadphoneSpecs(newHeadphone);
                headphoneSpecsRepository.save(headphoneSpecsService.updateHeadphoneSpecs(newHeadphone));
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
