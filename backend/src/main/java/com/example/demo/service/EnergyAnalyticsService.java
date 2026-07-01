package com.example.demo.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.EfficiencyReportDto;
import com.example.demo.dto.MetricBatchDto;
import com.example.demo.entity.EnergyMetric;
import com.example.demo.entity.PanelStatus;
import com.example.demo.entity.SolarPanel;
import com.example.demo.entity.TicketStatus;
import com.example.demo.repository.EnergyMetricRepository;
import com.example.demo.repository.MaintenanceTicketRepository;
import com.example.demo.repository.SolarPanelRepository;

@Service
public class EnergyAnalyticsService {
    private final EnergyMetricRepository metricRepository;
    private final SolarPanelRepository panelRepository;
    private final MaintenanceTicketRepository ticketRepository;

    public EnergyAnalyticsService(EnergyMetricRepository metricRepository,
                                  SolarPanelRepository panelRepository,
                                  MaintenanceTicketRepository ticketRepository) {
        this.metricRepository = metricRepository;
        this.panelRepository = panelRepository;
        this.ticketRepository = ticketRepository;
    }

    @Transactional
    public void ingestMetrics(MetricBatchDto dto) {

        List<EnergyMetric> metrics = new ArrayList<>();

        for (MetricBatchDto.MetricEntryDto entry : dto.getMetrics()) {

            SolarPanel panel = panelRepository.findById(entry.getPanelId())
                    .orElseThrow(() ->
                            new RuntimeException("Panel not found: " + entry.getPanelId()));

            panel.setUsageCount(panel.getUsageCount() + 1);

            if (panel.getUsageCount() >= 5 &&
                    panel.getStatus() == PanelStatus.ACTIVE) {
                panel.setStatus(PanelStatus.MAINTENANCE_REQUIRED);
            }

            panelRepository.save(panel);

            EnergyMetric metric = EnergyMetric.builder()
                    .panel(panel)
                    .timestamp(LocalDateTime.now())
                    .generationKwh(entry.getGenerationKwh())
                    .gridConsumptionKwh(entry.getGridConsumptionKwh())
                    .build();

            metrics.add(metric);
        }

        metricRepository.saveAll(metrics);
    }

    public EfficiencyReportDto getGlobalEfficiencyReport() {

        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime now = LocalDateTime.now();

        BigDecimal totalGen = metricRepository.getTotalGenerationInPeriod(startOfDay, now);
        BigDecimal totalCon = metricRepository.getTotalConsumptionInPeriod(startOfDay, now);

        if (totalGen == null) totalGen = BigDecimal.ZERO;
        if (totalCon == null) totalCon = BigDecimal.ZERO;

        BigDecimal ratio = BigDecimal.ZERO;

        if (totalGen.add(totalCon).compareTo(BigDecimal.ZERO) > 0) {
            ratio = totalGen.divide(
                    totalGen.add(totalCon),
                    4,
                    RoundingMode.HALF_UP);
        }

        return EfficiencyReportDto.builder()
                .totalGeneration(totalGen)
                .totalConsumption(totalCon)
                .efficiencyRatio(ratio)
                .totalActivePanels(
                        panelRepository.countByStatus(PanelStatus.ACTIVE))
                .openTickets(
                        ticketRepository.countByStatus(TicketStatus.OPEN))
                .inProgressTickets(
                        ticketRepository.countByStatus(TicketStatus.IN_PROGRESS))
                .resolvedTickets(
                        ticketRepository.countByStatus(TicketStatus.RESOLVED))
                .build();
    }

    public List<EnergyMetric> getRecentMetrics() {

        List<EnergyMetric> metrics = metricRepository.findRecentMetrics();

        if (metrics.size() > 3) {
            return metrics.subList(0, 3);
        }

        return metrics;
    }
}
