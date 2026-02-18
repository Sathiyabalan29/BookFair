package com.finalProject.bookfair.dto;

import java.util.List;
import java.time.LocalDateTime;

public class AdminReservationDTO {

    private Long id;
    private String userName;
    private String userEmail;
    private List<String> stallNames;
    private LocalDateTime reservationDate;
    private String status;
    private double price;
    private String qrCode;

    public AdminReservationDTO(Long id, String userName, String userEmail, List<String> stallNames,
                               LocalDateTime reservationDate, String qrCode, String status, double price) {
        this.id = id;
        this.userName = userName;
        this.userEmail = userEmail;
        this.stallNames = stallNames;
        this.reservationDate = reservationDate;
        this.qrCode = qrCode;
        this.status = status;
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<String> getStallNames() {
        return stallNames;
    }

    public void setStallNames(List<String> stallNames) {
        this.stallNames = stallNames;
    }

    public LocalDateTime getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(LocalDateTime reservationDate) {
        this.reservationDate = reservationDate;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
