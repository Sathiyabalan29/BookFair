package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.ReservationRequestDTO;
import com.finalProject.bookfair.dto.ReservationResponseDTO;
import com.finalProject.bookfair.model.Reservation;
import com.finalProject.bookfair.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin("*")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    //  Reserve stalls (PENDING_PAYMENT)
    @PostMapping("/reserve")
    public ReservationResponseDTO reserve(@RequestBody ReservationRequestDTO dto) {
        return reservationService.reserveStalls(dto);
    }

    //  Confirm reservation after payment
    @PostMapping("/confirm/{id}")
    public String confirm(@PathVariable Long id) {
        return reservationService.confirmReservation(id);
    }


    // Get all reservations for a user
    @GetMapping("/user/{userId}")
    public List<ReservationResponseDTO> getUserReservations(@PathVariable Long userId) {
        return reservationService.getUserReservations(userId);
    }

    // Get reservation by reservation id
    @GetMapping("/{id}")
    public Reservation getById(@PathVariable Long id) {
        return reservationService.getById(id);
    }

}