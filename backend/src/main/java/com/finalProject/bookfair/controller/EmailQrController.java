package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.ScanResponseDto;
import com.finalProject.bookfair.service.QrPassService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pass")
@RequiredArgsConstructor
public class EmailQrController {

    private final QrPassService qrPassService;

    //  Scan and validate QR pass
    @GetMapping("/scan")
    public ResponseEntity<ScanResponseDto> scan(@RequestParam String token) {
        boolean valid = qrPassService.validate(token);

        return ResponseEntity.ok(
                valid
                        ? new ScanResponseDto(true, "ENTRY ALLOWED")
                        : new ScanResponseDto(false, "INVALID OR EXPIRED PASS")
        );
    }
}
