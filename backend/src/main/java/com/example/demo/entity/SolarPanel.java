package com.example.demo.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Table(name="solar_panels")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolarPanel {
    @Id
    private Long id;

    @JoinColumn(name = "site_id",nullable = false)
    @JsonBackReference
    @ManyToOne()
    private SolarSite site;

    @Column(name =  "serial_number", unique = true, nullable = false)
    private String serialString;

    @Column(name = "model_type", nullable = false)
    private String modelType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private PanelStatus status;

    @Column(name = "installation_date", nullable = false)
    private LocalDate installationDate;

    @Builder.Defau
    @Column(name = "usage_count", nullable = false)
    private int usageCount; 

}
