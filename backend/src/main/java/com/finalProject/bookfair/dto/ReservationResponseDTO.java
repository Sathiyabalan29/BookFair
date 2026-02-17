package com.finalProject.bookfair.dto;

import java.math.BigDecimal;
import java.util.List;
import java.time.LocalDateTime;

public class ReservationResponseDTO {
    private Long reservationId;
    private String userName;
    private List<String> stallNames;
    private LocalDateTime reservationDate;
    private String status;
    private BigDecimal totalPrice;



    public ReservationResponseDTO(Long reservationId, String userName, List<String> stallNames,
                                  LocalDateTime reservationDate, String status, BigDecimal totalPrice) {
        this.reservationId = reservationId;
        this.userName = userName;
        this.stallNames = stallNames;
        this.reservationDate = reservationDate;
        this.status = status;
        this.totalPrice = totalPrice;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public String getUserName() {
        return userName;
    }

    public List<String> getStallNames() {
        return stallNames;
    }

    public LocalDateTime getReservationDate() {
        return reservationDate;
    }

    public String getStatus() {
        return status;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setStallNames(List<String> stallNames) {
        this.stallNames = stallNames;
    }

    public void setReservationDate(LocalDateTime reservationDate) {
        this.reservationDate = reservationDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}