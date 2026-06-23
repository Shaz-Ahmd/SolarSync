package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
    

}
