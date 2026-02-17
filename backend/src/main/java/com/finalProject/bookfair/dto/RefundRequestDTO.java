package com.finalProject.bookfair.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class RefundRequestDTO {
    @NotNull
    private Long reservationId;

    @NotNull
    private Long paymentId;
}