package com.gms.gmshopbackend.response;

import com.gms.gmshopbackend.dtos.RevenueProductDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RevenueResponse {
    private LocalDate date;
    private List<RevenueProductDTO> products;
}
