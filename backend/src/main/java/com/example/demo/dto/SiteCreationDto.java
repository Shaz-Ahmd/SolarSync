package com.example.demo.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SiteCreationDto {
     private String siteName;
    private String locationCoordinates;
    private BigDecimal ratedCapacityKw;
    private String commissionDate;
    private List<PanelInventoryDto> initialPanels;

    public void setCommissionDate(String commissionDate) {
        this.commissionDate = commissionDate;
    }

    @Data
    public static class PanelInventoryDto {

        private String serialNumber;
        private String modelType;

    }
}
