package com.finalProject.bookfair.dto;

import java.util.List;

public class ReservationRequestDTO {
    private Long userId;
    private List<String> stallNames;

    public Long getUserId() {
        return userId;
    }

    public List<String> getStallNames() {
        return stallNames;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setStallNames(List<String> stallNames) {
        this.stallNames = stallNames;
    }
}