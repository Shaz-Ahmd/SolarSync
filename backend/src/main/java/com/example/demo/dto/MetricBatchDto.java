package com.example.demo.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MetricBatchDto {
    private List<MetricEntryDto> metrics;

    @Data
    public static class MetricEntryDto {

        private Long panelId;
        private BigDecimal generationKwh;
        private BigDecimal gridConsumptionKwh;

    }
}
