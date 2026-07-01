package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MaintenanceTicket> createTicket(
            @RequestBody TicketRequestDto ticketRequestDto) {

        return ResponseEntity.ok(
                maintenanceService.createTicket(ticketRequestDto));
    }

    @GetMapping
    public ResponseEntity<List<MaintenanceTicket>> getAllTickets() {

        return ResponseEntity.ok(
                maintenanceService.getAllTickets());
    }

    @GetMapping("/{ticketId}")
    public ResponseEntity<MaintenanceTicket> getTicketById(
            @PathVariable Long ticketId) {

        return ResponseEntity.ok(
                maintenanceService.getTicketById(ticketId));
    }

    @PutMapping("/{ticketId}/status")
    public ResponseEntity<MaintenanceTicket> updateTicketStatus(
            @PathVariable Long ticketId,
            @RequestParam MaintenanceTicket.TicketStatus status) {

        return ResponseEntity.ok(
                maintenanceService.updateTicketStatus(ticketId, status));
    }

    @GetMapping("/technician/{technicianId}")
    public ResponseEntity<List<MaintenanceTicket>> getTicketsByTechnician(
            @PathVariable Long technicianId) {

        return ResponseEntity.ok(
                maintenanceService.getTicketsByTechnician(technicianId));
    }
}