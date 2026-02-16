package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public com.finalProject.bookfair.dto.AuthResponseDTO register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public com.finalProject.bookfair.dto.AuthResponseDTO login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        return authService.login(email, password);
    }

}
