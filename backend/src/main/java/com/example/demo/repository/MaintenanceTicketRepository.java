package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.MaintenanceTicket;

@Repository
public interface MaintenanceTicketRepository extends JpaRepository<MaintenanceTicket,Long>{
    List<MaintenanceTicket> findBySiteId(Long siteId);
    List<MaintenanceTicket> findByTechnicianId(Long technicianId);
    List<MaintenanceTicket> findBySiteId(Long siteId);
}
