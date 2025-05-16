package com.gms.gmshopbackend.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@SuperBuilder
public class ProductResponseList {


    private List<ProductResponse> products;
    private int totalPages;

}
