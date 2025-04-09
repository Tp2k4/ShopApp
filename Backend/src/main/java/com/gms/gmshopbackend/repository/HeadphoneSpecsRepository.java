package com.gms.gmshopbackend.repository;

import com.gms.gmshopbackend.model.HeadphoneSpecs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeadphoneSpecsRepository extends JpaRepository<HeadphoneSpecs, Long> {
}
