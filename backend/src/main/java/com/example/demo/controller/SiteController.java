package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<SolarSite> createSite(
            @RequestBody SiteCreationDto siteCreationDto) {

        SolarSite site = siteManagementService
                .registerSiteWithInitialPanels(siteCreationDto);

        return new ResponseEntity<>(site, HttpStatus.CREATED);
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