package com.finalProject.bookfair.dto;

import java.util.List;


public class StallHoldRequestDTO {

    private List<String> stallIds;

    public List<String> getStallIds() {
        return stallIds;
    }

    public void setStallIds(List<String> stallIds) {
        this.stallIds = stallIds;
    }
}