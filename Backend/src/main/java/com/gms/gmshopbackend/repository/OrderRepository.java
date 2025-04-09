package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(long userId);

    List<Order> id(Long id);

    Optional<Order> findById(Long integer);

}
