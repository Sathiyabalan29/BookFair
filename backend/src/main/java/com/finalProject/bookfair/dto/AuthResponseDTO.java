package com.finalProject.bookfair.dto;

public class AuthResponseDTO {
    private String token;
    private String message;
    private String status;
    private UserDTO user;

    public AuthResponseDTO(String token, String message, String status, UserDTO user) {
        this.token = token;
        this.message = message;
        this.status = status;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
