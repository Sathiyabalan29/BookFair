package com.finalProject.bookfair.repository;

import com.finalProject.bookfair.enums.PaymentStatus;
import com.finalProject.bookfair.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);
    List<Payment> findByUserId(Long userId);  // Get payments by user ID
    boolean existsByReservationId(Long reservationId);
}