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

    /*
     * REPORT ISSUE
     *
     * SYSTEM_ADMINISTRATOR and SOLAR_OPERATOR
     * can report a maintenance issue.
     */
    @PostMapping
    @PreAuthorize(
            "hasAnyAuthority(" +
            "'ROLE_SYSTEM_ADMINISTRATOR'," +
            "'ROLE_SOLAR_OPERATOR')")
    public ResponseEntity<MaintenanceTicket> reportIssue(
            @RequestBody TicketRequestDto dto) {

        return ResponseEntity.ok(
                maintenanceService.reportIssue(dto));
    }

    /*
     * ASSIGN TECHNICIAN
     *
     * Only administrator can assign a technician.
     */
    @PutMapping("/{id}/assign")
    @PreAuthorize("hasRole('SYSTEM_ADMINISTRATOR')")
    public ResponseEntity<MaintenanceTicket> assignTechnician(
            @PathVariable Long id,
            @RequestParam Long technicianId) {

        return ResponseEntity.ok(
                maintenanceService.assignTechnician(
                        id,
                        technicianId));
    }

    /*
     * START WORK
     *
     * ONLY MAINTENANCE TECHNICIAN.
     *
     * Admin cannot use this endpoint.
     */
    @PatchMapping("/{id}/start")
    @PreAuthorize("hasRole('MAINTENANCE_TECHNICIAN')")
    public ResponseEntity<MaintenanceTicket> startWork(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                maintenanceService.startWork(id));
    }

    /*
     * RESOLVE TICKET
     *
     * ONLY MAINTENANCE TECHNICIAN.
     *
     * Admin cannot resolve technician work.
     */
    @PatchMapping("/{id}/resolve")
    @PreAuthorize("hasRole('MAINTENANCE_TECHNICIAN')")
    public ResponseEntity<MaintenanceTicket> resolveTicket(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                maintenanceService.resolveTicket(id));
    }

    /*
     * GET ALL TICKETS
     *
     * Authenticated users can view tickets.
     */
    @GetMapping
    public ResponseEntity<List<MaintenanceTicket>> getAllTickets() {

        return ResponseEntity.ok(
                maintenanceService.getAllTickets());
    }

    /*
     * GET TICKETS BY TECHNICIAN
     */
    @GetMapping("/technician/{id}")
    public ResponseEntity<List<MaintenanceTicket>>
            getTicketsByTechnician(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                maintenanceService.getTicketsByTechnician(id));
    }
}