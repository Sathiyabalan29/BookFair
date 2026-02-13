package com.finalProject.bookfair.model;

import com.finalProject.bookfair.enums.StallSize;
import com.finalProject.bookfair.enums.StallStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@Table(name = "stalls")
public class Stall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "hall_id") // Foreign key column in stalls table
    private Hall hall;

    @Column(name = "stall_name", unique = true, nullable = false)
    private String stallName;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StallStatus status = StallStatus.AVAILABLE;

    @Column(name = "x")
    private int x;

    @Column(name = "y")
    private int y;

    @Column(name = "width")
    private int width;

    @Column(name = "height")
    private int height;

    @Enumerated(EnumType.STRING)
    @Column(name = "stall_size")
    private StallSize stallSize;

    @Column(name = "held_by_user_id")
    private Long heldByUserId;

    @Column(name = "hold_expiry_time")
    private LocalDateTime holdExpiryTime;

    @ManyToOne
    @JoinColumn(name = "stall_price_id")
    private StallPrice stallPrice;

    public Stall() {}

}
