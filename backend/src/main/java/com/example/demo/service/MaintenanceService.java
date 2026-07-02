package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.TicketRequestDto;
import com.example.demo.entity.MaintenanceTicket;
import com.example.demo.entity.PanelStatus;
import com.example.demo.entity.Priority;
import com.example.demo.entity.Role;
import com.example.demo.entity.SolarPanel;
import com.example.demo.entity.SolarSite;
import com.example.demo.entity.SystemUser;
import com.example.demo.entity.TicketStatus;
import com.example.demo.repository.MaintenanceTicketRepository;
import com.example.demo.repository.SolarPanelRepository;
import com.example.demo.repository.SolarSiteRepository;
import com.example.demo.repository.SystemUserRepository;

@Service
public class MaintenanceService {

    private final MaintenanceTicketRepository ticketRepository;
    private final SolarSiteRepository siteRepository;
    private final SolarPanelRepository panelRepository;
    private final SystemUserRepository userRepository;

    public MaintenanceService(
            MaintenanceTicketRepository ticketRepository,
            SolarSiteRepository siteRepository,
            SolarPanelRepository panelRepository,
            SystemUserRepository userRepository) {

        this.ticketRepository = ticketRepository;
        this.siteRepository = siteRepository;
        this.panelRepository = panelRepository;
        this.userRepository = userRepository;
    }

    @Transactional(rollbackFor = Exception.class)
    public MaintenanceTicket reportIssue(TicketRequestDto dto) {

        SolarSite site = siteRepository.findById(dto.getSiteId())
                .orElseThrow(() -> new RuntimeException("Site not found"));

        SolarPanel panel = panelRepository.findById(dto.getPanelId())
                .orElseThrow(() -> new RuntimeException("Panel not found"));

        SystemUser technician = userRepository.findById(dto.getTechnicianId())
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        panel.setStatus(PanelStatus.UNDER_MAINTENANCE);
        panelRepository.save(panel);

        MaintenanceTicket ticket = MaintenanceTicket.builder()
                .site(site)
                .panel(panel)
                .technician(technician)
                .issueDescription(dto.getIssueDescription())
                .priority(dto.getPriority())
                .status(TicketStatus.IN_PROGRESS)
                .reportedAt(LocalDateTime.now())
                .build();

        return ticketRepository.save(ticket);
    }

    @Transactional
    public MaintenanceTicket assignTechnician(Long ticketId, Long technicianId) {

        MaintenanceTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        SystemUser technician = userRepository.findById(technicianId)
                .orElseThrow(() -> new RuntimeException("Technician not found"));

        if (technician.getRole() != Role.MAINTENANCE_TECHNICIAN) {
            throw new RuntimeException("User is not a technician");
        }

        ticket.setTechnician(technician);
        ticket.setStatus(TicketStatus.IN_PROGRESS);

        SolarPanel panel = ticket.getPanel();
        panel.setStatus(PanelStatus.UNDER_MAINTENANCE);
        panelRepository.save(panel);

        return ticketRepository.save(ticket);
    }

    @Transactional
    public MaintenanceTicket resolveTicket(Long ticketId) {

        MaintenanceTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        if (ticket.getTechnician() != null) {

            List<MaintenanceTicket> tickets =
                    ticketRepository.findByTechnicianId(
                            ticket.getTechnician().getId());

            Priority highestPriority = tickets.stream()
                    .filter(t -> t.getStatus() != TicketStatus.RESOLVED)
                    .map(MaintenanceTicket::getPriority)
                    .max(Comparator.naturalOrder())
                    .orElse(ticket.getPriority());

            if (highestPriority.compareTo(ticket.getPriority()) > 0) {
                throw new RuntimeException(
                        "Clear the " + highestPriority + " tickets first");
            }
        }

        ticket.setStatus(TicketStatus.RESOLVED);

        SolarPanel panel = ticket.getPanel();
        panel.setStatus(PanelStatus.ACTIVE);
        panel.setUsageCount(0);

        panelRepository.save(panel);

        return ticketRepository.save(ticket);
    }

    public List<MaintenanceTicket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public List<MaintenanceTicket> getTicketsByTechnician(Long technicianId) {
        return ticketRepository.findByTechnicianId(technicianId);
    }
}