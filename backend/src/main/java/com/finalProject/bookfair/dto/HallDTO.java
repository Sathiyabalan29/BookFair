package com.finalProject.bookfair.dto;


public class HallDTO {

    private Long id;
    private String name;
    private int x;
    private int y;
    private int width;
    private int height;

    public HallDTO(Long id, String name, int x, int y, int width, int height) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // Getters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
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
