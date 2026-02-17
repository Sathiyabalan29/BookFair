package com.finalProject.bookfair.dto;

import com.finalProject.bookfair.enums.RefundStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class RefundResponseDTO {

    private Long refundId;
    private BigDecimal refundAmount;
    private Integer percentage;
    private RefundStatus status;
    private String message;
}