package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.EnergyMetric;

@Repository
public interface EnergyMetricRespository extends JpaRepository<EnergyMetric,Long>{
    @Query("SELECT SUM(e.generationKwh") FROM EnergyMetric e WHERE
}
