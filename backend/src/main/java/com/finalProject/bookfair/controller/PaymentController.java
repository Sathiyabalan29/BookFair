package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.PaymentRequestDTO;
import com.finalProject.bookfair.dto.PaymentResponseDTO;
import com.finalProject.bookfair.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PaymentController {

    private final PaymentService paymentService;

    // Make payment
    @PostMapping
    public PaymentResponseDTO pay(@RequestBody PaymentRequestDTO request) {
        return paymentService.createPayment(request);
    }

    // Get payments by user
    @GetMapping("/{userId}")
    public List<PaymentResponseDTO> getPaymentsByUser(@PathVariable Long userId) {
        return paymentService.getPaymentsByUserId(userId);
    }
}