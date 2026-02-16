package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.UserReservationsDTO;
import com.finalProject.bookfair.service.StallReservationCountService;
import com.finalProject.bookfair.config.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class UserReservationCountController {

    private final StallReservationCountService stallReservationCountService;
    private final JwtUtil jwtUtil;

    public UserReservationCountController(StallReservationCountService stallReservationCountService,
                                          JwtUtil jwtUtil) {
        this.stallReservationCountService = stallReservationCountService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/api/stalls/user-reservation-count")
    public UserReservationsDTO getUserReservationCount(HttpServletRequest request) {
        // Extract token from Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("JWT Token is missing");
        }

        String token = authHeader.substring(7);

        // Extract userId from token
        Long userId = jwtUtil.getUserIdFromToken(token);

        // Call service with userId
        return stallReservationCountService.countUserReservations(String.valueOf(userId));
    }

    @GetMapping("/api/test")
    public String test() {
        return "API is working!";
    }
}