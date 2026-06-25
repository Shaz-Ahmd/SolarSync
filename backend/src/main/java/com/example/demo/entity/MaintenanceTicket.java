package com.example.demo.entity;

import jakarta.persistence.Entity;
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

    
}
