package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductNameResponse {
    private String productName;

    public static ProductNameResponse fromProduct(Product product) {
        ProductNameResponse productNameResponse = ProductNameResponse.builder()
                .productName(product.getName())
                .build();

        return productNameResponse;
    }

}
