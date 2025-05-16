package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findById(int i);

    Optional<Object> findByName(String categoryId);
}
