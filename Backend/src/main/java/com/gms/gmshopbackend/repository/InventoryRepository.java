package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
}
