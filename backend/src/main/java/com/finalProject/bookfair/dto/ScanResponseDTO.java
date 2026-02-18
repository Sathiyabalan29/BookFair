package com.finalProject.bookfair.dto;

public class ScanResponseDTO {

    private boolean valid;
    private String message;

    public ScanResponseDTO(boolean valid, String message) {
        this.valid = valid;
        this.message = message;
    }

    public boolean isValid() { return valid; }
    public String getMessage() { return message; }
}
