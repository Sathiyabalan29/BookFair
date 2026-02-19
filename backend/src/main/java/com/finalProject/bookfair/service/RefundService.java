package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.RefundRequestDTO;
import com.finalProject.bookfair.dto.RefundResponseDTO;
import com.finalProject.bookfair.enums.PaymentStatus;
import com.finalProject.bookfair.enums.RefundStatus;
import com.finalProject.bookfair.model.Payment;
import com.finalProject.bookfair.model.Refund;
import com.finalProject.bookfair.model.Reservation;
import com.finalProject.bookfair.repository.PaymentRepository;
import com.finalProject.bookfair.repository.RefundRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefundService {

    private final PaymentRepository paymentRepository;
    private final RefundRepository refundRepository;
    private final ReservationService reservationService;

    public RefundResponseDTO processRefund(RefundRequestDTO request) {

        // Fetch payment
        Payment payment = paymentRepository.findById(request.getPaymentId())
                .orElseThrow(() -> new RuntimeException("Payment not found with ID: " + request.getPaymentId()));

        if (payment.getPaymentStatus() != PaymentStatus.SUCCESS) {
            throw new RuntimeException("Only successful payments can be refunded");
        }

        // Fetch reservation
        Reservation reservation = reservationService.getById(request.getReservationId());
        if (!reservation.getStatus().name().equals("CONFIRMED")) {
            throw new RuntimeException("Only confirmed reservations can be refunded");
        }

        //  Calculate days since reservation
        long days = Duration.between(reservation.getReservationDate(), LocalDateTime.now()).toDays();

        int percentage;
        if (days <= 15)
            percentage = 50;
        else if (days <= 30)
            percentage = 25;
        else
            percentage = 0;

        BigDecimal refundAmount = payment.getAmountPaid()
                .multiply(BigDecimal.valueOf(percentage))
                .divide(BigDecimal.valueOf(100));

        // Create refund entity
        Refund refund = new Refund();
        refund.setReservation(reservation);
        refund.setPayment(payment);
        refund.setRefundAmount(refundAmount);
        refund.setRefundPercentage(percentage);
        refund.setRefundStatus(percentage == 0 ? RefundStatus.REJECTED : RefundStatus.PENDING);
        refund.setRequestedDate(LocalDateTime.now());
        refund.setProcessedDate(percentage == 0 ? LocalDateTime.now() : null);

        Refund savedRefund = refundRepository.save(refund);

        //Return response DTO
        return RefundResponseDTO.builder()
                .refundId(savedRefund.getId())
                .refundAmount(savedRefund.getRefundAmount())
                .percentage(savedRefund.getRefundPercentage())
                .status(savedRefund.getRefundStatus())
                .message(percentage == 0 ? "No refund eligible" : "Refund request submitted")
                .build();
    }

    public java.util.List<RefundResponseDTO> getRefundsByUserId(Long userId) {
        java.util.List<Refund> refunds = refundRepository.findByReservation_User_Id(userId);
        return refunds.stream()
                .map(this::mapToResponse)
                .collect(java.util.stream.Collectors.toList());
    }

    private RefundResponseDTO mapToResponse(Refund refund) {
        return RefundResponseDTO.builder()
                .refundId(refund.getId())
                .refundAmount(refund.getRefundAmount())
                .percentage(refund.getRefundPercentage())
                .status(refund.getRefundStatus())
                .message(refund.getRefundPercentage() == 0 ? "No refund eligible"
                        : "Refund status: " + refund.getRefundStatus())
                .build();
    }
}