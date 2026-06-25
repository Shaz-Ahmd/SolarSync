package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
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
@Table(name = "energy_metrics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnergyMetric {

    @Id
    private Long id;

    @JoinColumn(name = "panel_id", nullable = false)
    @ManyToOne
    private SolarPanel panel;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    
    
}
