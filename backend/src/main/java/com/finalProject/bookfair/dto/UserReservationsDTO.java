package com.finalProject.bookfair.dto;

import com.finalProject.bookfair.model.Stall;
import java.util.List;

public class UserReservationsDTO {

    private int count;
    private List<Stall> stalls;

    public int getCount() {
        return count;
    }
    public void setCount(int count) {
        this.count = count;
    }

    public List<Stall> getStalls() {
        return stalls;
    }
    public void setStalls(List<Stall> stalls) {
        this.stalls = stalls;
    }
}