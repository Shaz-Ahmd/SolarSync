package com.example.demo.repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.EnergyMetric;

@Repository
public interface EnergyMetricRespository extends JpaRepository<EnergyMetric,Long>{
     @Query("SELECT SUM(e.generationKwh) FROM EnergyMetric e WHERE e.timestamp >= :start AND e.timestamp <= :end")
    BigDecimal getTotalGenerationInPeriod(@Param("start") LocalDateTime start,@Param("end") LocalDateTime end);

    @Query("SELECT SUM(e.gridConsumptionKwh) FROM EnergyMetric e WHERE e.timestamp >= :start AND e.timestamp <= :end")
    BigDecimal getTotalConsumptionInPeriod(@Param("start") LocalDateTime start,@Param("end") LocalDateTime end);

    List<EnergyMetric> findByPanelIdOrderByTimestampDesc(Long panelId);

    @Query("SELECT e FROM EnergyMetric e ORDER BY e.timestamp DESC")
    List<EnergyMetric> findRecentMetrics();

    @Query("SELECT SUM(e.generationKwh) FROM EnergyMetric e WHERE e.panel.site.id = :siteId")
    BigDecimal getTotalGenerationBySite(@Param("siteId") Long siteId);

}
