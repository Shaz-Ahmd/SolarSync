package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.EfficiencyReportDto;
import com.example.demo.dto.MetricBatchDto;
import com.example.demo.entity.EnergyMetric;
import com.example.demo.service.EnergyAnalyticsService;

@RestController
@RequestMapping("/api/metrics")
public class MetricController {

    private final EnergyAnalyticsService analyticsService;

    public MetricController(EnergyAnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @PostMapping("/batch")
    @PreAuthorize("hasRole('SOLAR_OPERATOR')")
    public ResponseEntity<Void> ingestMetrics(
            @RequestBody MetricBatchDto dto) {

        analyticsService.ingestMetrics(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/analytics")
    public ResponseEntity<EfficiencyReportDto> getAnalytics() {

        return ResponseEntity.ok(
                analyticsService.getGlobalEfficiencyReport());
    }

    @GetMapping("/recent")
    public ResponseEntity<List<EnergyMetric>> getRecentMetrics() {

        return ResponseEntity.ok(
                analyticsService.getRecentMetrics());
    }
}