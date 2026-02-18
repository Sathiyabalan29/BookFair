package com.finalProject.bookfair.dto;

import com.finalProject.bookfair.enums.StallStatus;

import java.math.BigDecimal;

public class AdminStallDTO extends StallDTO {
    private String heldBy;
    private BigDecimal price;
    private Long id;

    public AdminStallDTO(Long id, String stallName, StallStatus status, int x, int y, int width, int height,
                         String heldBy, BigDecimal price) {
        super(stallName, status, x, y, width, height);
        this.id = id;
        this.heldBy = heldBy;
        this.price = price;
    }

    public String getHeldBy() {
        return heldBy;
    }

    public void setHeldBy(String heldBy) {
        this.heldBy = heldBy;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
