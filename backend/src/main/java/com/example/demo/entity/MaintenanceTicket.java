package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "maintenance_tickets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceTicket {
    @Id
    private Long id;

    @JoinColumn(name = "site_id",nullable = false)
    @ManyToOne
    private SolarSite site;

    @JoinColumn(name = "panel_id",nullable = false)
    @ManyToOne
    private SolarPanel panel;

    @JoinColumn(name = "technician_id")
    @ManyToOne
    private SystemUser technician;

    @Column(name = "issue_description",nullable = false, columnDefinition = "TEXT")
    private String issueDescription;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;

    @Column(name = "reported_at",nullable = false)
    private LocalDateTime reported

}
