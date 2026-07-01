package com.example.demo.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EfficiencyReportDto {
    private BigDecimal totalGeneration;
    private BigDecimal totalConsumption;
    private BigDecimal efficiencyRatio;
    private long totalActivePanels;
    private long openTickets;
    private long inProgressTickets;
    private long resolvedTickets;
}
