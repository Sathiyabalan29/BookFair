package com.finalProject.bookfair.dto;

import com.finalProject.bookfair.enums.PaymentMethod;
import lombok.Data;

@Data
public class PaymentRequestDTO {
    private Long reservationId;
    private Long userId;
    private PaymentMethod paymentMethod;
}