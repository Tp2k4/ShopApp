package com.gms.gmshopbackend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.math.BigDecimal;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductPromotionDTO {
    @JsonProperty(value = "product_id")
    private String productName;

    @JsonProperty(value = "discount_percent")
    private BigDecimal discountPercent;
}
