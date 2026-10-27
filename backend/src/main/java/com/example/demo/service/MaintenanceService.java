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

    /*
     * REPORT ISSUE
     *
     * A newly reported ticket starts as OPEN.
     * The technician has not started working yet.
     */
    @Transactional(rollbackFor = Exception.class)
    public MaintenanceTicket reportIssue(TicketRequestDto dto) {

        SolarSite site = siteRepository.findById(dto.getSiteId())
                .orElseThrow(() ->
                        new RuntimeException("Site not found"));

        SolarPanel panel = panelRepository.findById(dto.getPanelId())
                .orElseThrow(() ->
                        new RuntimeException("Panel not found"));

        SystemUser technician = userRepository.findById(dto.getTechnicianId())
                .orElseThrow(() ->
                        new RuntimeException("Technician not found"));

        /*
         * Make sure the selected user is actually
         * a maintenance technician.
         */
        if (technician.getRole() != Role.MAINTENANCE_TECHNICIAN) {
            throw new RuntimeException(
                    "Selected user is not a maintenance technician");
        }

        /*
         * The panel needs maintenance because a
         * maintenance issue has been reported.
         */
        panel.setStatus(PanelStatus.UNDER_MAINTENANCE);
        panelRepository.save(panel);

        /*
         * IMPORTANT:
         *
         * Ticket starts as OPEN.
         *
         * OPEN = Technician has not started work yet.
         */
        MaintenanceTicket ticket = MaintenanceTicket.builder()
                .site(site)
                .panel(panel)
                .technician(technician)
                .issueDescription(dto.getIssueDescription())
                .priority(dto.getPriority())
                .status(TicketStatus.OPEN)
                .reportedAt(LocalDateTime.now())
                .build();

        return ticketRepository.save(ticket);
    }

    /*
     * ASSIGN TECHNICIAN
     *
     * Admin can assign a technician.
     *
     * Assignment does NOT mean the technician has
     * started working.
     *
     * Therefore status remains OPEN.
     */
    @Transactional
    public MaintenanceTicket assignTechnician(
            Long ticketId,
            Long technicianId) {

        MaintenanceTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        SystemUser technician = userRepository.findById(technicianId)
                .orElseThrow(() ->
                        new RuntimeException("Technician not found"));

        if (technician.getRole() != Role.MAINTENANCE_TECHNICIAN) {
            throw new RuntimeException(
                    "User is not a maintenance technician");
        }

        ticket.setTechnician(technician);

        /*
         * Assignment is not the same as starting work.
         */
        ticket.setStatus(TicketStatus.OPEN);

        SolarPanel panel = ticket.getPanel();

        if (panel != null) {
            panel.setStatus(PanelStatus.UNDER_MAINTENANCE);
            panelRepository.save(panel);
        }

        return ticketRepository.save(ticket);
    }

    /*
     * START WORK
     *
     * This is the action performed by the technician
     * when they actually begin maintenance.
     */
    @Transactional
    public MaintenanceTicket startWork(Long ticketId) {

        MaintenanceTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        /*
         * Ticket must have a technician assigned.
         */
        if (ticket.getTechnician() == null) {
            throw new RuntimeException(
                    "No technician is assigned to this ticket");
        }

        /*
         * Ticket must still be OPEN.
         */
        if (ticket.getStatus() != TicketStatus.OPEN) {
            throw new RuntimeException(
                    "Only OPEN tickets can be started");
        }

        /*
         * Find all unresolved tickets belonging
         * to this technician.
         */
        List<MaintenanceTicket> tickets =
                ticketRepository.findByTechnicianId(
                        ticket.getTechnician().getId());

        /*
         * Find the highest priority unresolved ticket.
         */
        Priority highestPriority = tickets.stream()
                .filter(t -> t.getStatus() != TicketStatus.RESOLVED)
                .map(MaintenanceTicket::getPriority)
                .filter(priority -> priority != null)
                .max(Comparator.naturalOrder())
                .orElse(ticket.getPriority());

        /*
         * Prevent technician from starting a
         * lower-priority ticket first.
         */
        if (ticket.getPriority() != null &&
                highestPriority != null &&
                highestPriority.compareTo(ticket.getPriority()) > 0) {

            throw new RuntimeException(
                    "Start the " +
                    highestPriority +
                    " priority ticket first");
        }

        /*
         * Technician has now started the work.
         */
        ticket.setStatus(TicketStatus.IN_PROGRESS);

        SolarPanel panel = ticket.getPanel();

        if (panel != null) {
            panel.setStatus(PanelStatus.UNDER_MAINTENANCE);
            panelRepository.save(panel);
        }

        return ticketRepository.save(ticket);
    }

    /*
     * RESOLVE TICKET
     *
     * Only an IN_PROGRESS ticket can be resolved.
     *
     * This prevents someone from resolving a ticket
     * before the technician starts work.
     */
    @Transactional
    public MaintenanceTicket resolveTicket(Long ticketId) {

        MaintenanceTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        /*
         * A technician must first start the work.
         */
        if (ticket.getStatus() != TicketStatus.IN_PROGRESS) {
            throw new RuntimeException(
                    "Start the ticket before resolving it");
        }

        /*
         * Check priority order.
         *
         * If the technician still has a higher-priority
         * unresolved ticket, they cannot resolve this one.
         */
        if (ticket.getTechnician() != null) {

            List<MaintenanceTicket> tickets =
                    ticketRepository.findByTechnicianId(
                            ticket.getTechnician().getId());

            Priority highestPriority = tickets.stream()
                    .filter(t -> t.getStatus() != TicketStatus.RESOLVED)
                    .map(MaintenanceTicket::getPriority)
                    .filter(priority -> priority != null)
                    .max(Comparator.naturalOrder())
                    .orElse(ticket.getPriority());

            if (highestPriority != null &&
                    ticket.getPriority() != null &&
                    highestPriority.compareTo(ticket.getPriority()) > 0) {

                throw new RuntimeException(
                        "Resolve the " +
                        highestPriority +
                        " priority ticket first");
            }
        }

        /*
         * Maintenance completed.
         */
        ticket.setStatus(TicketStatus.RESOLVED);

        /*
         * Panel becomes active again.
         */
        SolarPanel panel = ticket.getPanel();

        if (panel != null) {
            panel.setStatus(PanelStatus.ACTIVE);
            panel.setUsageCount(0);

            panelRepository.save(panel);
        }

        return ticketRepository.save(ticket);
    }

    /*
     * GET ALL TICKETS
     */
    public List<MaintenanceTicket> getAllTickets() {

        return ticketRepository.findAll();
    }

    /*
     * GET TICKETS FOR A TECHNICIAN
     */
    public List<MaintenanceTicket> getTicketsByTechnician(
            Long technicianId) {

        return ticketRepository.findByTechnicianId(technicianId);
    }
}