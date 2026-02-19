package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.RefundRequestDTO;
import com.finalProject.bookfair.dto.RefundResponseDTO;
import com.finalProject.bookfair.service.RefundService;
import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/refunds")
@RequiredArgsConstructor
public class RefundController {

    private final RefundService refundService;

    @PostMapping
    public ResponseEntity<RefundResponseDTO> refund(@RequestBody @Valid RefundRequestDTO request) {
        RefundResponseDTO response = refundService.processRefund(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<java.util.List<RefundResponseDTO>> getRefundsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(refundService.getRefundsByUserId(userId));
    }
}