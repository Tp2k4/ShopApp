package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.KeyboardSpecs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeyboardSpecsRepository extends JpaRepository<KeyboardSpecs, Long> {
}
