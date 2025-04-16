package com.gms.gmshopbackend.service.impl;

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


    @Override
    public List<InventoryGroupByDateDTO> getInventory() {
        try {
            List<Inventory> inventories = inventoryRepository.findAll();

            // Group theo transactionDate
            Map<LocalDate, List<Inventory>> grouped = inventories.stream()
                    .collect(Collectors.groupingBy(Inventory::getTransactionDate));

            // Tạo kết quả trả về theo định dạng mong muốn
            return grouped.entrySet().stream()
                    .map(entry -> {
                        LocalDate date = entry.getKey();
                        List<InventoryResponse> products = entry.getValue().stream()
                                .map(InventoryResponse::fromInventory)
                                .collect(Collectors.toList());

                        return new InventoryGroupByDateDTO(date, products); // chú ý tên class DTO ở đây
                    })
                    .sorted(Comparator.comparing(InventoryGroupByDateDTO::getTransactionDate)) // sửa đúng class name
                    .collect(Collectors.toList());

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
                .build();

        product.setStockQuantity(product.getStockQuantity() + nop);
        productRepository.save(product);
        inventoryRepository.save(newInventory);
        return InventoryResponse.fromInventory(newInventory);
    }
}


