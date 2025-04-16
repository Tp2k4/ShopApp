package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.InventoryGroupByDateDTO;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.response.InventoryResponse;

import java.util.List;

public interface IInventoryService {
    public List<InventoryGroupByDateDTO> getInventory();
    public InventoryResponse exportInventory(Product product, int quantity);

    public InventoryResponse importInventory(Long productId, int quantity);
}
