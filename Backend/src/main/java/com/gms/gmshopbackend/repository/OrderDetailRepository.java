package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
}
