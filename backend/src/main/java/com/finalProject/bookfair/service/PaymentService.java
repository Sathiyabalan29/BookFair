package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.PaymentRequestDTO;
import com.finalProject.bookfair.dto.PaymentResponseDTO;
import com.finalProject.bookfair.enums.PaymentStatus;
import com.finalProject.bookfair.enums.ReservationStatus;
import com.finalProject.bookfair.enums.StallStatus;
import com.finalProject.bookfair.model.Payment;
import com.finalProject.bookfair.model.Reservation;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final ReservationService reservationService;

    @Transactional
    public PaymentResponseDTO createPayment(PaymentRequestDTO request) {

        //  Get reservation
        Reservation reservation = reservationService.getById(request.getReservationId());

        //  Cannot pay cancelled
        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new RuntimeException("Cannot pay for cancelled reservation");
        }

        //  Only allow payment when waiting
        if (reservation.getStatus() != ReservationStatus.PENDING_PAYMENT) {
            throw new RuntimeException("Reservation is not awaiting payment");
        }

        //  Prevent double payment
        if (paymentRepository.existsByReservationId(reservation.getId())) {
            throw new RuntimeException("Payment already completed for this reservation");
        }

        //  VALIDATE HOLD STILL ACTIVE
        for (Stall stall : reservation.getStalls()) {

            if (stall.getStatus() != StallStatus.HOLD) {
                throw new RuntimeException("Stall " + stall.getStallName() + " is not on hold");
            }

            if (stall.getHeldByUser() == null ||
                    !stall.getHeldByUser().getId().equals(reservation.getUser().getId())) {
                throw new RuntimeException("Stall hold belongs to another user");
            }

            if (stall.getHoldExpiryTime() == null ||
                    stall.getHoldExpiryTime().isBefore(LocalDateTime.now())) {

                // optional auto cancel
                reservationService.cancelReservation(reservation.getId());

                throw new RuntimeException(
                        "Hold expired for stall " + stall.getStallName() +
                                ". Reservation cancelled."
                );
            }
        }

        // Calculate total
        BigDecimal total = reservation.getStalls().stream()
                .map(stall -> stall.getStallPrice().getPrice())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (total.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Invalid payment amount");
        }

        // 50% advance
        BigDecimal partialPayment = total.multiply(BigDecimal.valueOf(0.5));

        //  Create payment
        Payment payment = new Payment();
        payment.setReservation(reservation);
        payment.setUser(reservation.getUser());
        payment.setAmountPaid(partialPayment);
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setPaymentDate(LocalDateTime.now());

        Payment savedPayment = paymentRepository.save(payment);

        //  Confirm reservation + mark stalls booked
        reservationService.confirmReservation(reservation.getId());

        //  Response
        return PaymentResponseDTO.builder()
                .paymentId(savedPayment.getId())
                .amountPaid(savedPayment.getAmountPaid())
                .status(savedPayment.getPaymentStatus())
                .message("Payment successful and reservation confirmed")
                .userId(savedPayment.getUser().getId())
                .reservationId(savedPayment.getReservation().getId())
                .build();
    }

    // Get payments by user
    public List<PaymentResponseDTO> getPaymentsByUserId(Long userId) {
        return paymentRepository.findByUserId(userId).stream()
                .map(p -> PaymentResponseDTO.builder()
                        .paymentId(p.getId())
                        .amountPaid(p.getAmountPaid())
                        .status(p.getPaymentStatus())
                        .reservationId(p.getReservation().getId())
                        .userId(p.getUser().getId())
                        .build())
                .toList();
    }
}