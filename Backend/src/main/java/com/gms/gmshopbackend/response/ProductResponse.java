package com.gms.gmshopbackend.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gms.gmshopbackend.model.Brand;
import com.gms.gmshopbackend.model.Category;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.model.ProductImage;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
@EqualsAndHashCode(callSuper = false)
public class ProductResponse extends BaseResponse {

    private String name;
    private float price;

    @JsonProperty("stock_quantity")
    private int stockQuantity;

//    @JsonProperty("brand_id")
//    private Brand brandId;

    @JsonProperty("category_id")
    private Category categoryId;

    private SpecsResponse specs;

    private String thumbnail;

    private List<ProductImageResponse> productImages;

    private BigDecimal discountPercent;


    public static ProductResponse fromProduct(Product product) {
        ProductResponse productResponse = ProductResponse.builder()
                .name(product.getName())
//                .brandId(product.getBrand())
                .stockQuantity(product.getStockQuantity())
                .price(product.getPrice())
                .categoryId(product.getCategory())
                .thumbnail(product.getThumbnail())
                .productImages(product.getProductImages()
                        .stream()
                        .map(ProductImageResponse::fromProductImage)
                        .collect(Collectors.toList()))
                        .build();

        if(product.getMouseSpecs() !=null){
            productResponse.setSpecs(SpecsResponse.toMouse(product.getMouseSpecs()));
        }else if(product.getHeadphoneSpecs()!= null){
            productResponse.setSpecs(SpecsResponse.toHeadphone(product.getHeadphoneSpecs()));
        }else{
            productResponse.setSpecs(SpecsResponse.toKeyboard(product.getKeyboardSpecs()));
        }

        productResponse.setCreatedAt(product.getCreatedAt());
        productResponse.setUpdatedAt(product.getUpdatedAt());
        productResponse.setDiscountPercent(product.getDiscountPercent());

        return productResponse;

    }

}
