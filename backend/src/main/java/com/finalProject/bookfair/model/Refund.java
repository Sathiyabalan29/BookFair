package com.finalProject.bookfair.model;

import com.finalProject.bookfair.enums.RefundStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "refunds")
public class Refund {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One refund belongs to one reservation
    @OneToOne
    @JoinColumn(name = "reservation_id", nullable = false, unique = true)
    private Reservation reservation;

    // One refund belongs to one payment
    @OneToOne
    @JoinColumn(name = "payment_id", nullable = false, unique = true)
    private Payment payment;

    @Column(name = "refund_amount")
    private BigDecimal refundAmount;

    @Column(name = "refund_percentage")
    private Integer refundPercentage;

    @Enumerated(EnumType.STRING)
    @Column(name = "refund_status", nullable = false)
    private RefundStatus refundStatus;

    @Column(name = "requested_date")
    private LocalDateTime requestedDate = LocalDateTime.now();

    @Column(name = "processed_date")
    private LocalDateTime processedDate;
}
