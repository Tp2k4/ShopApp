package com.gms.gmshopbackend.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCartDTO {
    @NotBlank(message = "Price is required")
    @Min(value = 1, message = "Price must be greater than 0")
    private float price;

    private int quantity;

    @JsonProperty(value = "product_id")
    private Long productId;

}
