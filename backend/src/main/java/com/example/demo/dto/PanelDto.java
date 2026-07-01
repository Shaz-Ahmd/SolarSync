package com.example.demo.dto;

import java.time.LocalDate;

import com.example.demo.entity.PanelStatus;

import lombok.Data;

@Data
public class PanelDto {
    private String serialNumber;
    private String modelType;
    private PanelStatus status;
    private LocalDate installationDate;
    private Long siteId;
}
