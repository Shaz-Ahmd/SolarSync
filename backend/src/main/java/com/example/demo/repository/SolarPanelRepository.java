package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.PanelStatus;
import com.example.demo.entity.SolarPanel;

@Repository
public interface SolarPanelRepository extends JpaRepository<SolarPanel,Long>{
    List<SolarPanel>findBySiteId(Long siteId);
    Long countByStatus(PanelStatus status);
}
