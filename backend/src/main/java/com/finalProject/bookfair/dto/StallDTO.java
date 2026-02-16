package com.finalProject.bookfair.dto;

public class StallDTO {

    private String stallName;
    private String status;
    private int x;
    private int y;
    private int width;
    private int height;

    public StallDTO(String stallName, String status,
                    int x, int y, int width, int height) {
        this.stallName = stallName;
        this.status = status;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public StallDTO(String stallName, com.finalProject.bookfair.enums.StallStatus status,
                    int x, int y, int width, int height) {
        this.stallName = stallName;
        this.status = status != null ? status.name() : null;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public String getStallName() {
        return stallName;
    }

    public String getStatus() {
        return status;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }
}
