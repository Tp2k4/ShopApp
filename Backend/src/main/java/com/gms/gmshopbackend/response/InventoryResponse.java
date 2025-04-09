package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.model.Inventory;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter

public class InventoryResponse {

    private Long id;

    private String productName;

    private String transactionType;

    private Date transactionDate;

    private int quantity;

    public static InventoryResponse fromInventory(Inventory inventory) {
        InventoryResponse inventoryResponse = new InventoryResponse();
        inventoryResponse.id = inventory.getId();
        inventoryResponse.productName = inventory.getProductName();
        inventoryResponse.transactionType = inventory.getTransactionType();
        inventoryResponse.transactionDate = inventory.getTransactionDate();
        inventoryResponse.quantity = inventory.getQuantity();

        return inventoryResponse;
    }
}
