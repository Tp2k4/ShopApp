package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.model.Inventory;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.repository.ProductRepository;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class InventoryResponse {

    private Long id;

    private String productName;

    private String brand;

    private String category;

    private String transactionType;

    private int quantity;

    private Double importPrice;

    private Double sellPrice;


    public static InventoryResponse fromInventory(Inventory inventory) {

        InventoryResponse inventoryResponse = InventoryResponse.builder()
                .id(inventory.getId())
                .productName(inventory.getProductName())
                .brand(String.valueOf(inventory.getProductId().getBrand()))
                .category(inventory.getProductId().getCategory().getName())
                .transactionType(inventory.getTransactionType())
                .quantity(inventory.getQuantity())
                .importPrice(inventory.getImportPrice())
                .sellPrice(inventory.getSellPrice())
                .build();

        return inventoryResponse;
    }
}
