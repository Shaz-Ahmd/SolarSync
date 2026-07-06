package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.SiteCreationDto;
import com.example.demo.entity.SolarSite;
import com.example.demo.service.SiteManagementService;

@RestController
@RequestMapping("/api/sites")

public class SiteController {

    private final SiteManagementService siteManagementService;

    public SiteController(SiteManagementService siteManagementService) {
        this.siteManagementService = siteManagementService;
    }

    @PostMapping
    @PreAuthorize("hasRole('SYSTEM_ADMINISTRATOR')")
    public ResponseEntity<SolarSite> registerSite(
            @RequestBody SiteCreationDto dto) {

        return ResponseEntity.ok(
                siteManagementService.registerSiteWithInitialPanels(dto));
    }

    @GetMapping
    public ResponseEntity<List<SolarSite>> getAllSites() {

        return ResponseEntity.ok(
                siteManagementService.getAllSites());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolarSite> getSiteById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                siteManagementService.getSiteById(id));
    }
}