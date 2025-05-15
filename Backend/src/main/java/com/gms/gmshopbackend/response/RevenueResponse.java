package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.dtos.RevenueProductDTO;
import com.gms.gmshopbackend.model.Inventory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RevenueResponse {
    private LocalDate date;
    private String productName;
    private int quantity;
    private Double importPrice;
    private Double sellPrice;
    private Double totalRevenue;

    public static RevenueResponse fromDTO(Inventory inventory) {
        RevenueResponse revenueResponse = RevenueResponse.builder()
                .date(inventory.getTransactionDate())
                .productName(inventory.getProductName())
                .quantity(inventory.getQuantity())
                .importPrice(inventory.getImportPrice()==null?0:inventory.getImportPrice())
                .sellPrice(inventory.getSellPrice()==null?0:inventory.getSellPrice())
                .totalRevenue(inventory.getTransactionType().equalsIgnoreCase("export")?(inventory.getSellPrice()==null?0:inventory.getSellPrice())*inventory.getQuantity()
                        :(inventory.getImportPrice()==null?0: inventory.getImportPrice())*inventory.getQuantity())


                .build();

        return revenueResponse;

    }
}
