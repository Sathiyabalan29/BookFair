package com.finalProject.bookfair.model;

import com.finalProject.bookfair.enums.StallSize;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "stall_prices")
public class StallPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private StallSize size;

    private BigDecimal price;
}
