package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.PanelDto;
import com.example.demo.entity.PanelStatus;
import com.example.demo.entity.SolarPanel;
import com.example.demo.service.SiteManagementService;

@RestController
@RequestMapping("/api/panels")
public class PanelController {

    private final SiteManagementService siteManagementService;

    public PanelController(SiteManagementService siteManagementService) {
        this.siteManagementService = siteManagementService;
    }

    @PostMapping
    public ResponseEntity<SolarPanel> addPanel(
            @RequestBody PanelDto panelDto) {

        return ResponseEntity.ok(
                siteManagementService.addPanel(panelDto));
    }

    @GetMapping("/site/{siteId}")
    public ResponseEntity<List<SolarPanel>> getPanelsBySite(
            @PathVariable Long siteId) {

        return ResponseEntity.ok(
                siteManagementService.getPanelsBySite(siteId));
    }

    @PutMapping("/{panelId}/status")
    public ResponseEntity<SolarPanel> updatePanelStatus(
            @PathVariable Long panelId,
            @RequestParam PanelStatus status) {

        return ResponseEntity.ok(
                siteManagementService.updatePanelStatus(panelId, status));
    }
}