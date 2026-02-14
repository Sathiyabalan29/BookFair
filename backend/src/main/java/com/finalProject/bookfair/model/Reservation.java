package com.finalProject.bookfair.model;

import com.finalProject.bookfair.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "reservation", cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    private List<Stall> stalls = new ArrayList<>();

    @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL)
    private Payment payment;

    @OneToOne(mappedBy = "reservation")
    private Refund refund;

    @Enumerated(EnumType.STRING)
    private com.finalProject.bookfair.enums.ReservationStatus status;

    @Column(name = "reservation_date")
    private LocalDateTime reservationDate = LocalDateTime.now();

    @Column(name = "price")
    private BigDecimal price;

    public Reservation() {
    }

}
