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
import org.springframework.data.elasticsearch.ResourceNotFoundException;
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
    public List<ProductResponse> getAllProducts() {
        List<Product> productPage =  productRepository.findAll();
        return productPage.stream().map(ProductResponse::fromProduct).toList();

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
    @Transactional(rollbackFor = Exception.class)
    public Product createProduct(ProductDTO productDTO) {

        // Kiểm tra nếu sản phẩm đã tồn tại
        if (productRepository.existsByName(productDTO.getName())) {
            throw new RuntimeException("Product existed: " + productDTO.getName());
        }

        // Lấy category
        Category category = (Category) categoryRepository.findByName(productDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Lấy brand
        Brand brand = brandRepository.findByName(productDTO.getBrandId());
        if(brand == null){
            throw new RuntimeException("Brand not found");
        }


        // Tạo đối tượng Product từ DTO
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setOriginPrice(productDTO.getImportPrice());
        product.setDescription(productDTO.getDescription1());
        product.setDescription_2(productDTO.getDescription2());
        product.setDescription_3(productDTO.getDescription3());
        product.setStockQuantity(productDTO.getStockQuantity());
        product.setThumbnail(productDTO.getThumbnail());
        product.setCategory(category);
        product.setBrand(brand);

        // ✅ Lưu sản phẩm trước, chưa set specs (tránh lỗi khóa ngoại ngược)
        Product savedProduct = productRepository.save(product);

        // Tùy vào category, tạo specs tương ứng rồi gán lại
        if (category.getName().equalsIgnoreCase("Mouse")) {
            MouseSpecs newMouseSpecs = mouseSpecsService.createMouseSpecs(savedProduct, productDTO);
            savedProduct.setMouseSpecs(newMouseSpecs);
        }

        if (category.getName().equalsIgnoreCase("Keyboard")) {
            KeyboardSpecs newKeyboardSpecs = keyboardSpecsService.createKeyboardSpecs(savedProduct, productDTO);
            savedProduct.setKeyboardSpecs(newKeyboardSpecs);
        }

        if (category.getName().equalsIgnoreCase("Headphone")) {
            HeadphoneSpecs newHeadphoneSpecs = headphoneSpecsService.createHeadphoneSpecs(savedProduct, productDTO);
            savedProduct.setHeadphoneSpecs(newHeadphoneSpecs);
        }


        // ✅ Lưu lại sản phẩm lần cuối sau khi đã gán specs
        return productRepository.save(savedProduct);
    }


    @Override

    public Product updateProduct(Long id, ProductDTO productDTO) {

        try {
            Product existing_product = productRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("Product not found")
            );


            existing_product.setName(productDTO.getName());
            existing_product.setPrice(productDTO.getPrice());
            existing_product.setOriginPrice(productDTO.getImportPrice());
            existing_product.setDescription(productDTO.getDescription1());
            existing_product.setDescription_2(productDTO.getDescription2());
            existing_product.setDescription_3(productDTO.getDescription3());
            existing_product.setStockQuantity(productDTO.getStockQuantity());
            existing_product.setThumbnail(productDTO.getThumbnail());

            Category category = (Category) categoryRepository.findByName(productDTO.getCategoryId()).orElseThrow(
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

                MouseSpecs updated = mouseSpecsService.updateMouseSpecs(existing_product.getMouseSpecs().getId(), newMouse);
                existing_product.setMouseSpecs(updated);
            } else if (category.getName().equalsIgnoreCase("Keyboard")) {
                KeyboardSpecs newKeyBoard = KeyboardSpecs.builder()
                        .product(existing_product)
                        .led(productDTO.isLed())
                        .numKeys((long)productDTO.getNumKeys())
                        .color(productDTO.getColor())
                        .battery(productDTO.getBattery())
                        .warranty(productDTO.getWarranty())
                        .weight(productDTO.getWeight())
                        .connectionType(productDTO.getConnectionType())
                        .switchType(productDTO.getSwitchType())
                        .build();

                KeyboardSpecs updated = keyboardSpecsService.updateKeyboardSpecs(existing_product.getKeyboardSpecs().getId(), newKeyBoard);
                existing_product.setKeyboardSpecs(updated);
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

                HeadphoneSpecs updated = headphoneSpecsService.updateHeadphoneSpecs(existing_product.getHeadphoneSpecs().getId(),newHeadphone);
                existing_product.setHeadphoneSpecs(updated);
            }


            // Lưu vào database
            productRepository.save(existing_product);
            return existing_product;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }

    @Override
    public void deleteProduct(Long id) {
        Product existing_product = productRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Product not found")
        );
        try{
            existing_product.setIsActive(false);
            productRepository.save(existing_product);
        }catch (Exception e){
            throw new RuntimeException(e.getMessage());
        }


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

    @Override
    public List<ProductImage> updateProductImages(Long productId, List<ProductImageDTO> productImageDTOs) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));

        if (productImageDTOs.size() > ProductImage.MAX_IMAGE_PER_PRODUCT) {
            throw new IllegalArgumentException("You can only upload up to "
                    + ProductImage.MAX_IMAGE_PER_PRODUCT + " images");
        }

        // Delete old images
        productImageRepository.deleteByProductId(product);

        // Convert DTOs to entities
        List<ProductImage> productImages = productImageDTOs.stream()
                .map(dto -> ProductImage.builder()
                        .productId(product)
                        .imageUrl(dto.getImageUrl())
                        .build())
                .collect(Collectors.toList());

        return productImageRepository.saveAll(productImages);
    }

}
