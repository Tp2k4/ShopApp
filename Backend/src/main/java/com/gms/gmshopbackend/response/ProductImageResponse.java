package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.model.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImageResponse {
    private Long productId;
    private String imageUrl;

    public static ProductImageResponse fromProductImage(ProductImage productImage) {
        ProductImageResponse productImageResponse = ProductImageResponse.builder()
                .productId(productImage.getProductId().getId())
                .imageUrl(productImage.getImageUrl())
                .build();

        return productImageResponse;
    }
}
