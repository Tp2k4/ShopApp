package com.gms.gmshopbackend.service.impl;

import com.gms.gmshopbackend.dtos.RevenueProductDTO;
import com.gms.gmshopbackend.model.Inventory;
import com.gms.gmshopbackend.model.Order;
import com.gms.gmshopbackend.model.OrderStatus;
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
        List<Inventory> exportList = inventoryRepository.findByTransactionDateBetween(startDate, endDate)
                .stream()
                .filter(inventory -> inventory.getTransactionType().equalsIgnoreCase("export"))
                .toList();

        return exportList.stream()
                .map(RevenueResponse::fromDTO)
                .collect(Collectors.toList());
    }


    @Override
    public double getTodayRevenue() {
        double totalRevenue = 0;
        LocalDate today = LocalDate.now();
        List<Order> order = orderRepository.findByOrderDateBetween(today, today);
        for(Order orderItem : order) {
            if(!orderItem.getStatus().equalsIgnoreCase(String.valueOf(OrderStatus.DELETED))) {
                totalRevenue += orderItem.getTotalMoney();
            }
        }

        return totalRevenue;
    }

    @Override
    public List<RevenueResponseByMonth> getLastSixMonthRevenue() {
        // Tính ngày bắt đầu từ đầu tháng 3 tháng trước
        LocalDate fromDate = LocalDate.now().minusMonths(6).withDayOfMonth(1);

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
        for (int i = 5; i >= 0; i--) {
            LocalDate month = LocalDate.now().minusMonths(i);
            String monthKey = month.getYear() + "-" + String.format("%02d", month.getMonthValue());
            Double revenue = revenueByMonth.getOrDefault(monthKey, 0.0);
            result.add(new RevenueResponseByMonth(monthKey, revenue));
        }

        return result;
    }

    public List<RevenueResponse> getAll(){
        try{
            List<Inventory> inventoryList = inventoryRepository.findAll();
            List<Inventory> sellList = new ArrayList<>();
            for (Inventory inventory : inventoryList) {
                if(inventory.getTransactionType().equalsIgnoreCase("export")){
                    sellList.add(inventory);
                }
            }
            return sellList.stream().map(RevenueResponse::fromDTO).collect(Collectors.toList());
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }


}
