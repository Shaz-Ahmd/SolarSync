package com.example.demo.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.PanelDto;
import com.example.demo.entity.PanelStatus;
import com.example.demo.entity.SolarPanel;
import com.example.demo.entity.SolarSite;
import com.example.demo.repository.SolarPanelRepository;
import com.example.demo.repository.SolarSiteRepository;

@RestController
@RequestMapping("/api/panels")
public class PanelController {

    private final SolarPanelRepository panelRepository;
    private final SolarSiteRepository siteRepository;

    public PanelController(SolarPanelRepository panelRepository,
                           SolarSiteRepository siteRepository) {
        this.panelRepository = panelRepository;
        this.siteRepository = siteRepository;
    }

    @GetMapping("/site/{siteId}")
    public ResponseEntity<List<SolarPanel>> getPanelsBySite(
            @PathVariable Long siteId) {

        return ResponseEntity.ok(panelRepository.findBySiteId(siteId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolarPanel> getPanelById(
            @PathVariable Long id) {

        return ResponseEntity.of(panelRepository.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('SOLAR_OPERATOR')")
    public ResponseEntity<SolarPanel> addPanel(
            @RequestBody PanelDto dto) {

        SolarSite site = siteRepository.findById(dto.getSiteId())
                .orElseThrow(() -> new RuntimeException("Site not found"));

        SolarPanel panel = SolarPanel.builder()
                .site(site)
                .serialNumber(dto.getSerialNumber())
                .modelType(dto.getModelType())
                .status(dto.getStatus())
                .installationDate(dto.getInstallationDate())
                .build();

        return ResponseEntity.ok(panelRepository.save(panel));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('SOLAR_OPERATOR')")
    public ResponseEntity<SolarPanel> updatePanel(
            @PathVariable Long id,
            @RequestBody PanelDto dto) {

        SolarPanel panel = panelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Panel not found"));

        panel.setSerialNumber(dto.getSerialNumber());
        panel.setModelType(dto.getModelType());
        panel.setStatus(dto.getStatus());
        panel.setInstallationDate(dto.getInstallationDate());

        return ResponseEntity.ok(panelRepository.save(panel));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('SOLAR_OPERATOR')")
    public ResponseEntity<Void> deletePanel(
            @PathVariable Long id) {

        panelRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}