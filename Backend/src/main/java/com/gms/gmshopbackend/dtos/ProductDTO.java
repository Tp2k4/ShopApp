package com.gms.gmshopbackend.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gms.gmshopbackend.model.HeadphoneSpecs;
import com.gms.gmshopbackend.model.KeyboardSpecs;
import com.gms.gmshopbackend.model.MouseSpecs;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;


@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDTO {


    @NotBlank(message = "name is required")
    private String name;

    @NotBlank(message = "Price is required")
    @Min(value = 1, message = "Price must be greater than 0")
    private float price;

    private String thumbnail;

    @JsonProperty(value = "category_id")
    private String categoryId;

    @JsonProperty(value = "stock_quantity")
    private int stockQuantity;

    @JsonProperty(value = "brand_id")
    private String brandId;

    private String battery;
    private String warranty;
    private String connectionType;
    private float weight;
    private String color;
    private boolean led;
    private int maxDpi;
    private boolean hasMic;
    private boolean noiseCancelling;
    private int numKeys;
    private String switchType;
    private Double importPrice;
    private String description1;
    private String description2;
    private String description3;







}
