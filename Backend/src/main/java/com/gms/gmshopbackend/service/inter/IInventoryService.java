package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.dtos.InventoryGroupByDateDTO;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.response.InventoryResponse;

import java.time.LocalDate;
import java.util.List;

public interface IInventoryService {
    public List<InventoryResponse> getInventory();
    public InventoryResponse exportInventory(Product product, int quantity);

    public InventoryResponse importInventory(Long productId, int quantity);
    public List<InventoryResponse> getInventoryByDate(LocalDate from, LocalDate to);
}
