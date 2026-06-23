package com.example.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "solar_sites")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(
        mappedBy = "site",
        cascade = CascadeType.ALL,
        fetch = FetchType.LAZY
    )
    @JsonManagedReference
    private List<SolarPanel> panels;

    @Transient
    private BigDecimal currentGeneration;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getSiteName() {
        return siteName;
    }
    public void setSiteName(String siteName) {
        this.siteName = siteName;
    }
    public String getLocationCoordinates() {
        return locationCoordinates;
    }
    public void setLocationCoordinates(String locationCoordinates) {
        this.locationCoordinates = locationCoordinates;
    }
    public BigDecimal getRatedCapacityKw() {
        return ratedCapacityKw;
    }
    public void setRatedCapacityKw(BigDecimal ratedCapacityKw) {
        this.ratedCapacityKw = ratedCapacityKw;
    }
    public LocalDate getCommissionDate() {
        return commissionDate;
    }
    public void setCommissionDate(LocalDate commissionDate) {
        this.commissionDate = commissionDate;
    }
    
}
