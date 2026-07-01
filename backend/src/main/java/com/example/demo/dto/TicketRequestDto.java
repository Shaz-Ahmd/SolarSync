package com.example.demo.dto;

import com.example.demo.entity.MaintenanceTicket;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketRequestDto {
     private Long siteId;
    private Long panelId;
    private String issueDescription;
    private MaintenanceTicket.Priority priority;
    private Long technicianId;
}
