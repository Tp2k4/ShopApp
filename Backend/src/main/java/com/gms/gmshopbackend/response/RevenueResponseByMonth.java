package com.gms.gmshopbackend.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RevenueResponseByMonth {
    private String month;
    private double revenue;
}
