package com.gms.gmshopbackend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RevenueProductDTO {
    private String productName;
    private int quantity;
    private Double importPrice;
    private Double sellPrice;
    private Double totalRevenue;
}
