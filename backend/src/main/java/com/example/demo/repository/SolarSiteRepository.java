package com.example.demo.repository;

import java.math.BigDecimal;

import javax.swing.text.html.parser.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SolarSiteRepository extends JpaRepository<Entity,Long> {
    @Query("SELECT SUM(s.ratedCapacityKw FROM SolarSite s")
    private BigDecimal getTotalSystemCapacity();
}
