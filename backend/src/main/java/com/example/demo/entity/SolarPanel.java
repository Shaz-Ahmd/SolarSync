package com.example.demo.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "site_id",nullable = false)
    @JsonBackReference
    @ManyToOne()
    private SolarSite site;

    @Column(name =  "serial_number", unique = true, nullable = false)
    private String serialNumber;

    @Column(name = "model_type", nullable = false)
    private String modelType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private PanelStatus status;

    @Column(name = "installation_date", nullable = false)
    private LocalDate installationDate;

    @Builder.Default
    @Column(name = "usage_count", nullable = false)
    private int usageCount = 0; 

    @OneToMany(
        mappedBy = "panel",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonIgnore
    private List<EnergyMetric> metrics;

    @OneToMany(
        mappedBy = "panel",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonIgnore
    private List<EnergyMetric> tickets;

    

}
