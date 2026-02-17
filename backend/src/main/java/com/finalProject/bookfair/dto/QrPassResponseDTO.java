package com.finalProject.bookfair.dto;

import java.time.LocalDate;

public class QrPassResponseDTO {

    private String token;
    private LocalDate validFrom;
    private LocalDate validUntil;
    private boolean active;
    private String userName;
    private String email;

    public QrPassResponseDTO(
            String token,
            LocalDate validFrom,
            LocalDate validUntil,
            boolean active,
            String userName,
            String email
    ) {
        this.token = token;
        this.validFrom = validFrom;
        this.validUntil = validUntil;
        this.active = active;
        this.userName = userName;
        this.email = email;
    }

    public String getToken() { return token; }
    public LocalDate getValidFrom() { return validFrom; }
    public LocalDate getValidUntil() { return validUntil; }
    public boolean isActive() { return active; }
    public String getUserName() { return userName; }
    public String getEmail() { return email; }
}
