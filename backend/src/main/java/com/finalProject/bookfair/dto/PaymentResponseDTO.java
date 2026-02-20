package com.finalProject.bookfair.dto;

import com.finalProject.bookfair.enums.PaymentStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PaymentResponseDTO{
    private Long paymentId;
    private BigDecimal amountPaid;
    private PaymentStatus status;
    private String message;
    private Long userId;
    private Long reservationId;
    private String paymentMethod;
}