package com.gms.gmshopbackend.dtos;

import com.gms.gmshopbackend.model.Inventory;
import com.gms.gmshopbackend.response.InventoryResponse;
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
public class InventoryGroupByDateDTO {
    private LocalDate transactionDate;
    private List<InventoryResponse> products;


}
