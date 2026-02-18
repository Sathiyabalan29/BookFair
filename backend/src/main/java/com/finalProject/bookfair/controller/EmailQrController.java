package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.ScanResponseDTO;
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
    public ResponseEntity<ScanResponseDTO> scan(@RequestParam String token) {
        boolean valid = qrPassService.validate(token);

        return ResponseEntity.ok(
                valid
                        ? new ScanResponseDTO(true, "ENTRY ALLOWED")
                        : new ScanResponseDTO(false, "INVALID OR EXPIRED PASS")
        );
    }
}
