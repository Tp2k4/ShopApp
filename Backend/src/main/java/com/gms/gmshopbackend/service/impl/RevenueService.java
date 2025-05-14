package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.RevenueProductDTO;
import com.gms.gmshopbackend.model.Inventory;
import com.gms.gmshopbackend.model.Order;
import com.gms.gmshopbackend.repository.InventoryRepository;
import com.gms.gmshopbackend.repository.OrderRepository;
import com.gms.gmshopbackend.response.RevenueResponse;
import com.gms.gmshopbackend.response.RevenueResponseByMonth;
import com.gms.gmshopbackend.service.inter.IRevenueService;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class RevenueService implements IRevenueService {

    private final InventoryRepository inventoryRepository;
    private final OrderRepository orderRepository;

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

    @Override
    public double getTodayRevenue() {
        double totalRevenue = 0;
        LocalDate today = LocalDate.now();
        List<Inventory> todayInventoryList = inventoryRepository.findByTransactionDateBetween(today, today);
        for (Inventory inventory : todayInventoryList) {
            if(inventory.getTransactionType().equalsIgnoreCase("export")){
                totalRevenue += inventory.getSellPrice()*inventory.getQuantity();
            }
        }
        return totalRevenue;
    }

    @Override
    public List<RevenueResponseByMonth> getLastThreeMonthRevenue() {
        // Tính ngày bắt đầu từ đầu tháng 3 tháng trước
        LocalDate fromDate = LocalDate.now().minusMonths(3).withDayOfMonth(1);

        // Lấy các đơn hàng từ thời điểm đó
        List<Order> orders = orderRepository.findByOrderDateAfter(fromDate);

        // Dùng Map để nhóm theo định dạng "yyyy-MM" và tính tổng
        Map<String, Double> revenueByMonth = orders.stream()
                .collect(Collectors.groupingBy(
                        o -> o.getOrderDate().getYear() + "-" + String.format("%02d", o.getOrderDate().getMonthValue()),
                        Collectors.summingDouble(Order::getTotalMoney)
                ));

        // Tạo danh sách 3 tháng gần nhất (kể cả nếu không có đơn hàng vẫn có giá trị 0)
        List<RevenueResponseByMonth> result = new ArrayList<>();
        for (int i = 2; i >= 0; i--) {
            LocalDate month = LocalDate.now().minusMonths(i);
            String monthKey = month.getYear() + "-" + String.format("%02d", month.getMonthValue());
            Double revenue = revenueByMonth.getOrDefault(monthKey, 0.0);
            result.add(new RevenueResponseByMonth(monthKey, revenue));
        }

        return result;
    }

}
