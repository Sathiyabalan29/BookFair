package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.StallHoldRequestDTO;
import com.finalProject.bookfair.service.StallHoldService;
import com.finalProject.bookfair.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stalls")
public class StallHoldController {

    @Autowired
    private StallHoldService holdService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/hold")
    public String holdStalls(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody StallHoldRequestDTO request) {

        String token = authHeader.substring(7);

        Long userId = jwtUtil.getUserIdFromToken(token);
        return holdService.holdStalls(userId, request.getStallIds());
    }
}