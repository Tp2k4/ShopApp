package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.response.RevenueResponse;

import java.time.LocalDate;
import java.util.List;

public interface IRevenueService {
    public List<RevenueResponse> getRevenueByDate(LocalDate startDate, LocalDate endDate);
}
