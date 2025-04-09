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

    private String description;

    @JsonProperty(value = "category_id")
    private Long categoryId;

    @JsonProperty(value = "stock_quantity")
    private int stockQuantity;

//    @JsonProperty(value = "brand_id")
//    private Long brandId;

    @JsonProperty(value = "mouse_specs")
    private MouseSpecs mouseSpecsId;

    @JsonProperty(value = "keyboard_specs")
    private KeyboardSpecs keyboardSpecsId;

    @JsonProperty(value = "headphone_specs")
    private HeadphoneSpecs headphoneSpecsId;




}
