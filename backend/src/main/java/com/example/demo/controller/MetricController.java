package com.example.demo.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.EfficiencyReportDto;
import com.example.demo.dto.MetricBatchDto;
import com.example.demo.entity.EnergyMetric;
import com.example.demo.service.EnergyAnalyticsService;

@RestController
@RequestMapping("/api/metrics")
public class MetricController {

    private final EnergyAnalyticsService energyAnalyticsService;

    public MetricController(EnergyAnalyticsService energyAnalyticsService) {
        this.energyAnalyticsService = energyAnalyticsService;
    }

    @PostMapping("/batch")
    public ResponseEntity<String> uploadMetrics(
            @RequestBody MetricBatchDto metricBatchDto) {

        energyAnalyticsService.processMetricBatch(metricBatchDto);

        return ResponseEntity.ok("Metrics uploaded successfully.");
    }

    @GetMapping("/panel/{panelId}")
    public ResponseEntity<List<EnergyMetric>> getPanelMetrics(
            @PathVariable Long panelId) {

        return ResponseEntity.ok(
                energyAnalyticsService.getMetricsByPanel(panelId));
    }

    @GetMapping("/report")
    public ResponseEntity<EfficiencyReportDto> getEfficiencyReport(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {

        return ResponseEntity.ok(
                energyAnalyticsService.generateEfficiencyReport(start, end));
    }

    @GetMapping("/generation")
    public ResponseEntity<BigDecimal> getTotalGeneration(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {

        return ResponseEntity.ok(
                energyAnalyticsService.getTotalGeneration(start, end));
    }

    @GetMapping("/consumption")
    public ResponseEntity<BigDecimal> getTotalConsumption(
            @RequestParam LocalDateTime start,
            @RequestParam LocalDateTime end) {

        return ResponseEntity.ok(
                energyAnalyticsService.getTotalConsumption(start, end));
    }
}