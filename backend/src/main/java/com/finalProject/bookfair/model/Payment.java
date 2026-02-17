package com.finalProject.bookfair.model;

import com.finalProject.bookfair.enums.PaymentMethod;
import com.finalProject.bookfair.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "reservation_id", unique = true)
    private Reservation reservation;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToOne(mappedBy = "payment")
    private Refund refund;

    private  String message;

    @Column(name = "amount_paid", nullable = false)
    private BigDecimal amountPaid;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;

    @Column(name = "transaction_id", unique = true)
    private String transactionId;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    public Payment() {
    }
}
