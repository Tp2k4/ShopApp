package com.gms.gmshopbackend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductImageDTO {

    @JsonProperty(value = "product_id")
    @NotBlank(message = "product id is required")
    private Long productId;

    @JsonProperty(value = "image_url")
    private String imageUrl;
}
