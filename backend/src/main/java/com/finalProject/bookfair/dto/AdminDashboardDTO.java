package com.finalProject.bookfair.dto;

import java.math.BigDecimal;

public class AdminDashboardDTO {

    private long totalUsers;
    private long totalReservations;
    private long availableStalls;
    private long reservedStalls;
    private long totalPayments;
    private BigDecimal totalRevenue;
    private long recentReservationsCount;

    public AdminDashboardDTO() {}

    public AdminDashboardDTO(long totalUsers, long totalReservations, long availableStalls,
                             long reservedStalls, long totalPayments, BigDecimal totalRevenue,
                             long recentReservationsCount) {
        this.totalUsers = totalUsers;
        this.totalReservations = totalReservations;
        this.availableStalls = availableStalls;
        this.reservedStalls = reservedStalls;
        this.totalPayments = totalPayments;
        this.totalRevenue = totalRevenue;
        this.recentReservationsCount = recentReservationsCount;
    }

    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }

    public long getTotalReservations() { return totalReservations; }
    public void setTotalReservations(long totalReservations) { this.totalReservations = totalReservations; }

    public long getAvailableStalls() { return availableStalls; }
    public void setAvailableStalls(long availableStalls) { this.availableStalls = availableStalls; }

    public long getReservedStalls() { return reservedStalls; }
    public void setReservedStalls(long reservedStalls) { this.reservedStalls = reservedStalls; }

    public long getTotalPayments() { return totalPayments; }
    public void setTotalPayments(long totalPayments) { this.totalPayments = totalPayments; }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }

    public long getRecentReservationsCount() { return recentReservationsCount; }
    public void setRecentReservationsCount(long recentReservationsCount) { this.recentReservationsCount = recentReservationsCount; }
}
