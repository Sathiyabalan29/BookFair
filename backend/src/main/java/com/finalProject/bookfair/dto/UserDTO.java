package com.finalProject.bookfair.dto;

import java.util.Set;

public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String businessName;
    private String businessRegisterNumber;
    private String phoneNumber;
    private String vendorType;
    private String businessAddress;

    private Set<GenreDTO> genres;

    public UserDTO() {
    }

    public UserDTO(Long id, String name, String email, String role,
                   String businessName, String businessRegisterNumber,
                   String phoneNumber, String vendorType, String businessAddress) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.businessName = businessName;
        this.businessRegisterNumber = businessRegisterNumber;
        this.phoneNumber = phoneNumber;
        this.vendorType = vendorType;
        this.businessAddress = businessAddress;
    }

    public UserDTO(Long id, String name, String email, String role,
                   String businessName, String businessRegisterNumber,
                   String phoneNumber, String vendorType, String businessAddress, Set<GenreDTO> genres) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.businessName = businessName;
        this.businessRegisterNumber = businessRegisterNumber;
        this.phoneNumber = phoneNumber;
        this.vendorType = vendorType;
        this.businessAddress = businessAddress;
        this.genres = genres;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBusinessRegisterNumber() {
        return businessRegisterNumber;
    }

    public void setBusinessRegisterNumber(String businessRegisterNumber) {
        this.businessRegisterNumber = businessRegisterNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getVendorType() {
        return vendorType;
    }

    public void setVendorType(String vendorType) {
        this.vendorType = vendorType;
    }

    public String getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(String businessAddress) {
        this.businessAddress = businessAddress;
    }

    public Set<GenreDTO> getGenres() {
        return genres;
    }

    public void setGenres(Set<GenreDTO> genres) {
        this.genres = genres;
    }
}
