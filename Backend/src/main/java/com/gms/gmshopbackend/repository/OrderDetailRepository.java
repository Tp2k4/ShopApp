package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Order;
import com.gms.gmshopbackend.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrder(Order order);
}
