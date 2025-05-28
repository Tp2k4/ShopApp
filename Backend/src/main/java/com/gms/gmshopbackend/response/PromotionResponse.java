package com.gms.gmshopbackend.response;


import com.gms.gmshopbackend.dtos.ProductPromotionDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PromotionResponse {
    private Long id;
    private String name;
    private String type;
    private String state;
    private LocalDate startDate;
    private LocalDate endDate;
    private String thumbnail;
    List<ProductPromotionDTO> products;
}
