package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "solar_sites")
public class SolarSite {
    @Id
    private Long id;
    @Column(name = "site_name",unique = true, nullable = false)
    private String siteName;
    @Column(name = "location_coordinates",nullable=false)
    private String locationCoordinates;
    @Column(name = "rated_capacity_kw", nullable = false)
    private BigDecimal ratedCapacityKw;
    @Column(name = "commission_date", nullable = false)
    private LocalDate commissionDate;
    @OneToMany()
}
