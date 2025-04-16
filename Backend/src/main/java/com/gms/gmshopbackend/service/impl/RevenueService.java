package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.RevenueProductDTO;
import com.gms.gmshopbackend.model.Inventory;
import com.gms.gmshopbackend.repository.InventoryRepository;
import com.gms.gmshopbackend.response.RevenueResponse;
import com.gms.gmshopbackend.service.inter.IRevenueService;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RevenueService implements IRevenueService {

    private final InventoryRepository inventoryRepository;

    @Override
    public List<RevenueResponse> getRevenueByDate(LocalDate startDate, LocalDate endDate) {
        List<Inventory> inventoryList = inventoryRepository.findByTransactionDateBetween(startDate, endDate);

        Map<LocalDate, List<Inventory>> groupedByDate = inventoryList.stream()
                .collect(Collectors.groupingBy(Inventory::getTransactionDate));

        // Tạo kết quả trả về
        return groupedByDate.entrySet().stream()
                .map(entry -> {
                    LocalDate date = entry.getKey();
                    List<RevenueProductDTO> productDTOs = entry.getValue().stream()
                            .map(inventory -> RevenueProductDTO.builder()
                                    .productName(inventory.getProductName())
                                    .quantity(inventory.getQuantity())
                                    .importPrice(inventory.getImportPrice()!=null?inventory.getImportPrice():inventory.getProductId().getPrice())
                                    .sellPrice(inventory.getSellPrice()!=null?inventory.getSellPrice():inventory.getProductId().getPrice())
                                    .totalRevenue(inventory.getQuantity() * (inventory.getSellPrice()!=null?inventory.getSellPrice():inventory.getProductId().getPrice()))
                                    .build())
                            .collect(Collectors.toList());

                    return RevenueResponse.builder()
                            .date(date)
                            .products(productDTOs)
                            .build();
                })
                .sorted(Comparator.comparing(RevenueResponse::getDate))
                .collect(Collectors.toList());

    }
}
