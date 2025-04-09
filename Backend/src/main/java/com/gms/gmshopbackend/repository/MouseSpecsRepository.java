package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.MouseSpecs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MouseSpecsRepository extends JpaRepository<MouseSpecs, Long> {
}
