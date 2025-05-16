package com.gms.gmshopbackend.controller;

import com.github.javafaker.Faker;
import com.gms.gmshopbackend.dtos.ProductDTO;
import com.gms.gmshopbackend.dtos.ProductImageDTO;
import com.gms.gmshopbackend.model.*;
import com.gms.gmshopbackend.repository.*;
import com.gms.gmshopbackend.response.ProductNameResponse;
import com.gms.gmshopbackend.response.ProductResponse;
import com.gms.gmshopbackend.response.ProductResponseList;
import com.gms.gmshopbackend.service.impl.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/product")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    private final ProductService productService;
    private final ProductRepository productRepository;

    private final MouseSpecsRepository mouseSpecsRepository;
    private final KeyboardSpecsRepository keyboardSpecsRepository;
    private final HeadphoneSpecsRepository headphoneSpecsRepository;
    private final CategoryRepository categoryRepository;
    private final BrandRepository brandRepository;

    private final Random random = new Random();
    private final Faker faker = new Faker();

    @GetMapping("")
    public ResponseEntity<ProductResponseList> getAllProducts(@RequestParam("page") int page,
                                                              @RequestParam("limit") int limit) {

        PageRequest pageRequest = PageRequest.of(page, limit);

        try {
            Page<ProductResponse> productsResponse = productService.getAllProducts(pageRequest);

            if (productsResponse == null || productsResponse.isEmpty()) {
                return ResponseEntity.noContent().build(); // Trả về 204 No Content nếu không có sản phẩm
            }

            int totalPages = productsResponse.getTotalPages();
            List<ProductResponse> products = productsResponse.getContent();

            return ResponseEntity.ok(
                    ProductResponseList.builder()
                            .products(products)
                            .totalPages(totalPages)
                            .build()
            );
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        try {
            ProductResponse product = ProductResponse.fromProduct(productService.getProductById(id));
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping("/category/{id}")
    public ResponseEntity<ProductResponseList> getAllProductsByCategory(@RequestParam("page") int page,
                                                                        @RequestParam("limit") int limit, @PathVariable Long id) {

        PageRequest pageRequest = PageRequest.of(page, limit);

        try {
            Page<ProductResponse> productsResponse = productService.getProductsByCategoryId(id, pageRequest);

            if (productsResponse == null || productsResponse.isEmpty()) {
                return ResponseEntity.noContent().build(); // Trả về 204 No Content nếu không có sản phẩm
            }

            int totalPages = productsResponse.getTotalPages();
            List<ProductResponse> products = productsResponse.getContent();

            System.out.println(products.toArray().length);

            return ResponseEntity.ok(
                    ProductResponseList.builder()
                            .products(products)
                            .totalPages(totalPages)
                            .build()
            );
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @GetMapping("/search/productName")
    public ResponseEntity<ProductResponseList> searchProduct(@RequestParam("page") int page,
                                                             @RequestParam("limit") int limit,
                                                             @RequestParam("name") String keyword) {

        PageRequest pageRequest = PageRequest.of(page, limit);
        System.out.println(keyword);

        try {
            Page<ProductResponse> productsResponse = productService.searchProducts(keyword, pageRequest);

            if (productsResponse == null || productsResponse.isEmpty()) {
                return ResponseEntity.noContent().build(); // Trả về 204 No Content nếu không có sản phẩm
            }


            int totalPages = productsResponse.getTotalPages();
            List<ProductResponse> products = productsResponse.getContent();

            System.out.println(products.toArray().length);

            return ResponseEntity.ok(
                    ProductResponseList.builder()
                            .products(products)
                            .totalPages(totalPages)
                            .build()
            );
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @PostMapping("create-product")
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO) {
        try {
            Product product = productService.createProduct(productDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(ProductResponse.fromProduct(product));


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @PostMapping(value = "/upload-img/{productId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> uploadImg(@PathVariable Long productId,
                                       @ModelAttribute("files") ArrayList<MultipartFile> files) {
        try {
            Product existingProduct = productService.getProductById(productId);

            List<ProductImageDTO> productImages = new ArrayList<>();

            files = files == null ? new ArrayList<MultipartFile>() : files;
            if (files.size() > ProductImage.MAX_IMAGE_PER_PRODUCT) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("You can not upload more than 5 images per product");
            }

            for (MultipartFile file : files) {
                if (file.getSize() == 0) {
                    continue;
                }

                if (file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body("You can not upload a image larger than 10 bytes");
                }

                String contentType = file.getContentType();
                if (contentType == null || !contentType.startsWith("image")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("file must be an image");
                }

                String fileName = storeFile(file);
                ProductImageDTO productImageDTO = ProductImageDTO.builder()
                        .imageUrl(fileName)
                        .build();

                productImages.add(productImageDTO);

            }
            List<ProductImage> productImageList = productService.uploadProductImage(productId, productImages);
            existingProduct.setThumbnail(productImageList.get(0).getImageUrl());
            productRepository.save(existingProduct);
            return ResponseEntity.ok("Uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }


    private boolean isImageFile(MultipartFile file) {
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image")) {
            return false;
        }
        return true;
    }

    private String storeFile(MultipartFile file) throws IOException {
        if (!isImageFile(file) && file.getOriginalFilename() == null) {
            throw new IOException("Invalid file");
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        String uniqueFileName = UUID.randomUUID().toString() + "_" + fileName;

        Path uploadDir = Paths.get("Backend/upload/product/images");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        Path destination = Paths.get(uploadDir.toString(), uniqueFileName);
        Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;

    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<?> viewImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get("Backend/upload/product/images/" + imageName);
            UrlResource resource = new UrlResource(imagePath.toUri());
            return resource.exists() ? ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource)
                    : ResponseEntity.badRequest().body("Image not found");
        } catch (Exception var4) {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable("id") Long id) {
        try {
            productRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateProductById(@PathVariable("id") Long id,
                                               @RequestBody ProductDTO productDTO) {
        try {
            Product product = productService.updateProduct(id, productDTO);
            return ResponseEntity.ok(product);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

    }

    @GetMapping("/admin/product-name-list")
    public ResponseEntity<?> getProductNameList() {
        try{
            List<ProductNameResponse> product_list = productService.getProductNames();
            return ResponseEntity.ok(product_list);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }



//    @PutMapping("update_brand")
//    public void updateProductBrand(){
//        for(long id =1; id<= 945; id++){
//            Product product = productService.getProductById(id);
//            Brand brand = brandRepository.findById((long) faker.number().numberBetween(1,4)).orElseThrow(
//                    () -> new RuntimeException("Brand not found")
//            );
//            product.setBrand(brand);
//            productRepository.save(product);
//        }
//    }


//    @PostMapping("/generate-products")
//    public ResponseEntity<String> generateFakerProducts(@RequestParam(defaultValue = "1000") int count) {
//        int created = 0;
//        for (int i = 0; i < count; i++) {
//            String productName = faker.commerce().productName();
//            if (productRepository.existsByName(productName)) {
//                continue;
//            }
//
//            Optional<Category> optionalCategory = Optional.ofNullable(categoryRepository.findById(faker.number().numberBetween(1, 4)));
//            if (optionalCategory.isEmpty()) {
//                return ResponseEntity.badRequest().body("Category not found for ID: "+optionalCategory.get().getId());
//            }
//            Category categoryId = optionalCategory.get();
//
//
//            Product product = new Product();
//            product.setName(productName);
//            product.setPrice((float) faker.number().numberBetween(10, 90_000_000));
//            product.setDescription(faker.lorem().sentence());
//            product.setCategory(categoryId);
//            product.setThumbnail("");
//            product.setStockQuantity(faker.number().numberBetween(1, 100));
//
//            try {
//                // Lưu sản phẩm mới
//                Product newProduct = productService.createProduct(product);
//                productRepository.flush();
//                created++;
//
//                // Thêm hoặc cập nhật thông số kỹ thuật theo loại sản phẩm
//                if (categoryId.getId() == 1) {
//                    if (newProduct.getMouseSpecs() == null) { // Kiểm tra nếu chưa có thông số kỹ thuật
//                        MouseSpecs newMouseSpecs = mouseSpecsRepository.save(generateMouseSpecs(newProduct));
//                        newProduct.setMouseSpecs(newMouseSpecs);
//                        productRepository.save(newProduct); // Chỉ lưu sản phẩm một lần
//                    }
//                } else if (categoryId.getId() == 2) {
//                    if (newProduct.getKeyboardSpecs() == null) {
//                        KeyboardSpecs newKeyboardSpecs = keyboardSpecsRepository.save(generateKeyboardSpecs(newProduct));
//                        newProduct.setKeyboardSpecs(newKeyboardSpecs);
//                        productRepository.save(newProduct);
//                    }
//                } else if (categoryId.getId() == 3) {
//                    if (newProduct.getHeadphoneSpecs() == null) {
//                        HeadphoneSpecs newHeadphoneSpecs = headphoneSpecsRepository.save(generateHeadphoneSpecs(newProduct));
//                        newProduct.setHeadphoneSpecs(newHeadphoneSpecs);
//                        productRepository.save(newProduct);
//                    }
//                }
//
//            } catch (Exception e) {
//                return ResponseEntity.badRequest().body("Error at product #" + created + ": " + e.getMessage());
//            }
//
//        }
//        return ResponseEntity.ok("✅ Created " + created + " fake products successfully.");
//    }

    private MouseSpecs generateMouseSpecs(Product productId) {
        return new MouseSpecs(
                null, // id tự động tăng
                productId,
                faker.bothify("Lithium-ion ##mAh"),
                faker.bothify("# years warranty"),
                random.nextInt(800, 16000),
                random.nextBoolean() ? "Wireless" : "Wired",
                random.nextBoolean(),
                random.nextFloat(50, 200),
                faker.color().name()
        );
    }

    private KeyboardSpecs generateKeyboardSpecs(Product productId) { // Nhận Product thay vì productId
        String[] switchTypes = {"Blue", "Red", "Brown", "Optical"};

        return new KeyboardSpecs(
                null, // id tự động tăng
                productId, // Truyền nguyên đối tượng Product
                faker.bothify("Lithium ##mAh"),
                faker.bothify("# years warranty"),
                (long) random.nextInt(),
                switchTypes[random.nextInt(switchTypes.length)],
                random.nextBoolean() ? "Wireless" : "Wired",
                random.nextBoolean(),
                random.nextFloat(500, 1500),
                faker.color().name()
        );
    }


    private HeadphoneSpecs generateHeadphoneSpecs(Product productId) { // Nhận Product thay vì productId
        return new HeadphoneSpecs(
                null, // id tự động tăng
                productId, // Truyền nguyên đối tượng Product
                faker.bothify("Lithium ##mAh"),
                faker.bothify("# years warranty"),
                random.nextBoolean() ? "Bluetooth" : "Wired",
                random.nextBoolean(),
                random.nextBoolean(),
                random.nextFloat(100, 500),
                faker.color().name()
        );
    }

}


