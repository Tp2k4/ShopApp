package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.InventoryDTO;
import com.gms.gmshopbackend.dtos.InventoryGroupByDateDTO;
import com.gms.gmshopbackend.model.Inventory;
import com.gms.gmshopbackend.model.Product;
import com.gms.gmshopbackend.repository.InventoryRepository;
import com.gms.gmshopbackend.repository.ProductRepository;
import com.gms.gmshopbackend.response.InventoryResponse;
import com.gms.gmshopbackend.service.inter.IInventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService implements IInventoryService {

    private final InventoryRepository inventoryRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;


    @Override
    public List<InventoryResponse> getInventory() {
        try {
            List<Inventory> inventories = inventoryRepository.findAll();
            return inventories.stream().map(InventoryResponse::fromInventory).collect(Collectors.toList());

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
                .transactionDate(LocalDate.now())
                .sellPrice((double) product.getPrice())
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
                .transactionDate(LocalDate.now())
                .importPrice((double) product.getPrice())
                .build();

        product.setStockQuantity(product.getStockQuantity() + nop);
        productRepository.save(product);
        inventoryRepository.save(newInventory);
        return InventoryResponse.fromInventory(newInventory);
    }

    @Override
    public List<InventoryResponse> getInventoryByDate(LocalDate from, LocalDate to) {
        try{
            List<Inventory> inventories = inventoryRepository.findByTransactionDateBetween(from, to);
            return inventories.stream().map(InventoryResponse::fromInventory).collect(Collectors.toList());

        }catch(RuntimeException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Inventory createInventory(InventoryDTO inventoryDTO) {
        Product existingProduct = productRepository.findByName(inventoryDTO.getProductName());
        if (existingProduct == null) {
            throw new RuntimeException("Product not found with name: " + inventoryDTO.getProductName());
        }

        double importPrice = 0;
        double sellPrice = 0;

        if ("import".equalsIgnoreCase(inventoryDTO.getTransactionType())) {
            importPrice = existingProduct.getOriginPrice() != null ? existingProduct.getOriginPrice() : 0;
        } else if ("export".equalsIgnoreCase(inventoryDTO.getTransactionType())) {
            sellPrice = existingProduct.getPrice();
        }

        Inventory newInventory = Inventory.builder()
                .productId(existingProduct)
                .productName(inventoryDTO.getProductName())
                .transactionType(inventoryDTO.getTransactionType())
                .quantity(inventoryDTO.getQuantity())
                .transactionDate(LocalDate.now())
                .importPrice(importPrice)
                .sellPrice(sellPrice)
                .build();

        existingProduct.setStockQuantity(newInventory.getTransactionType().equals("export")?
                existingProduct.getStockQuantity() - inventoryDTO.getQuantity():
                existingProduct.getStockQuantity() + inventoryDTO.getQuantity());

        productRepository.save(existingProduct);

        return inventoryRepository.save(newInventory);
    }

}


