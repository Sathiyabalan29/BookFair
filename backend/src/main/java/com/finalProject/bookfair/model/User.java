package com.finalProject.bookfair.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role;

    @Column(name = "business_name")
    private String businessName;

    @Column(name = "business_registernumber")
    private String businessRegisterNumber;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "vendor_type")
    private String vendorType; // publisher, vendor

    @Column(name = "business_address")
    private String businessAddress;

    @ManyToMany
    @JoinTable(name = "user_genres", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<Genre> genres = new HashSet<>();

    @OneToOne(mappedBy = "user")
    @JsonIgnore
    private QrPass qrPass;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    public User() {
    }


    public User(String name, String email, String password, String role,
                String businessName, String businessRegisterNumber,
                String phoneNumber, String vendorType,
                String businessAddress) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.businessName = businessName;
        this.businessRegisterNumber = businessRegisterNumber;
        this.phoneNumber = phoneNumber;
        this.vendorType = vendorType;
        this.businessAddress = businessAddress;
    }
}
