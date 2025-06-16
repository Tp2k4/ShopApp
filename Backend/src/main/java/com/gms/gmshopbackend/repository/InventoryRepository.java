package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    List<Inventory> findByTransactionDateBetween(LocalDate transactionDateAfter, LocalDate transactionDateBefore);

}
