package com.example.demo.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.SiteCreationDto;
import com.example.demo.entity.PanelStatus;
import com.example.demo.entity.SolarPanel;
import com.example.demo.entity.SolarSite;
import com.example.demo.repository.EnergyMetricRepository;
import com.example.demo.repository.SolarPanelRepository;
import com.example.demo.repository.SolarSiteRepository;

@Service
public class SiteManagementService {

    private final SolarSiteRepository siteRepository;
    private final SolarPanelRepository panelRepository;
    private final EnergyMetricRepository metricRepository;

    public SiteManagementService(
            SolarSiteRepository siteRepository,
            SolarPanelRepository panelRepository,
            EnergyMetricRepository metricRepository) {

        this.siteRepository = siteRepository;
        this.panelRepository = panelRepository;
        this.metricRepository = metricRepository;
    }

    @Transactional(rollbackFor = Exception.class)
    public SolarSite registerSiteWithInitialPanels(SiteCreationDto dto) {

        boolean exists = siteRepository.findAll()
                .stream()
                .anyMatch(site ->
                        site.getSiteName().equalsIgnoreCase(dto.getSiteName()));

        if (exists) {
            throw new RuntimeException(
                    "Site with name " + dto.getSiteName() + " already exists.");
        }

        SolarSite site = SolarSite.builder()
                .siteName(dto.getSiteName())
                .locationCoordinates(dto.getLocationCoordinates())
                .ratedCapacityKw(dto.getRatedCapacityKw())
                .commissionDate(LocalDate.parse(dto.getCommissionDate()))
                .build();

        SolarSite savedSite = siteRepository.save(site);

        if (dto.getInitialPanels() != null &&
                !dto.getInitialPanels().isEmpty()) {

            List<SolarPanel> panels = new ArrayList<>();

            for (SiteCreationDto.PanelInventoryDto panelDto : dto.getInitialPanels()) {

                SolarPanel panel = SolarPanel.builder()
                        .site(savedSite)
                        .serialNumber(panelDto.getSerialNumber())
                        .modelType(panelDto.getModelType())
                        .status(PanelStatus.ACTIVE)
                        .installationDate(LocalDate.now())
                        .build();

                panels.add(panel);
            }

            panelRepository.saveAll(panels);
        }

        return savedSite;
    }

    public List<SolarSite> getAllSites() {

        List<SolarSite> sites = siteRepository.findAll();

        for (SolarSite site : sites) {

            BigDecimal generation =
                    metricRepository.getTotalGenerationBySite(site.getId());

            site.setCurrentGeneration(
                    generation == null ? BigDecimal.ZERO : generation);
        }

        return sites;
    }

    public SolarSite getSiteById(Long id) {

        SolarSite site = siteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Site not found"));

        BigDecimal generation =
                metricRepository.getTotalGenerationBySite(site.getId());

        site.setCurrentGeneration(
                generation == null ? BigDecimal.ZERO : generation);

        return site;
    }
}