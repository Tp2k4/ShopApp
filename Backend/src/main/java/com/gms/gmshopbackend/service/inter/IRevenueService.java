package com.gms.gmshopbackend.service.inter;

import com.gms.gmshopbackend.response.RevenueResponse;
import com.gms.gmshopbackend.response.RevenueResponseByMonth;

import java.time.LocalDate;
import java.util.List;

public interface IRevenueService {
    public List<RevenueResponse> getRevenueByDate(LocalDate startDate, LocalDate endDate);
    public double getTodayRevenue();
    public List<RevenueResponseByMonth> getLastSixMonthRevenue();
}

