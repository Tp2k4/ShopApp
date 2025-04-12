package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.model.Inventory;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.repository.InventoryRepository;
import com.gms.gmshopbackend.repository.ProductRepository;
import com.gms.gmshopbackend.response.InventoryResponse;
import com.gms.gmshopbackend.service.inter.IInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService implements IInventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;


    @Override
    public List<InventoryResponse> getInventory() {
        try{
            List<Inventory> inventoryResponses = inventoryRepository.findAll();
            List<InventoryResponse> inventoryResponseList = inventoryResponses
                                                            .stream()
                                                            .map(InventoryResponse::fromInventory)
                                                            .collect(Collectors.toList());

            return inventoryResponseList;

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public InventoryResponse exportInventory(Product product, int nop) {
        Inventory newInventory = Inventory.builder()
                .productId(product)
                .productName(product.getName())
                .transactionType("export")
                .quantity(nop)
                .transactionDate(new Date())
                .build();

        inventoryRepository.save(newInventory);
        return InventoryResponse.fromInventory(newInventory);

    }

    @Override
    public InventoryResponse importInventory(Long productId, int nop) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new RuntimeException("Product not found")
        );
        Inventory newInventory = Inventory.builder()
                .productId(product)
                .productName(product.getName())
                .transactionType("import")
                .quantity(nop)
                .transactionDate(new Date())
                .build();

        product.setStockQuantity(product.getStockQuantity() + nop);
        productRepository.save(product);
        inventoryRepository.save(newInventory);
        return InventoryResponse.fromInventory(newInventory);
    }
}
