package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.TicketRequestDto;
import com.example.demo.entity.MaintenanceTicket;
import com.example.demo.service.MaintenanceService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final MaintenanceService maintenanceService;

    public TicketController(MaintenanceService maintenanceService) {
        this.maintenanceService = maintenanceService;
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SOLAR_OPERATOR')")
    public ResponseEntity<MaintenanceTicket> reportIssue(
            @RequestBody TicketRequestDto dto) {

        return ResponseEntity.ok(maintenanceService.reportIssue(dto));
    }

    @PutMapping("/{id}/assign")
    @PreAuthorize("hasAuthority('SYSTEM_ADMINISTRATOR')")
    public ResponseEntity<MaintenanceTicket> assignTechnician(
            @PathVariable Long id,
            @RequestParam Long technicianId) {

        return ResponseEntity.ok(
                maintenanceService.assignTechnician(id, technicianId));
    }

    @PatchMapping("/{id}/resolve")
    @PreAuthorize("hasAuthority('MAINTENANCE_TECHNICIAN')")
    public ResponseEntity<MaintenanceTicket> resolveTicket(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                maintenanceService.resolveTicket(id));
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceTicket>> getAllTickets() {

        return ResponseEntity.ok(
                maintenanceService.getAllTickets());
    }

    @GetMapping("/technician/{id}")
    public ResponseEntity<List<MaintenanceTicket>> getTicketsByTechnician(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                maintenanceService.getTicketsByTechnician(id));
    }
}