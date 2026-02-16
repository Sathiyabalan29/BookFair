package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.AuthResponseDTO;
import com.finalProject.bookfair.dto.UserDTO;
import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.repository.AuthRepository;
import com.finalProject.bookfair.config.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponseDTO register(User user) {

        if (authRepository.existsByEmail(user.getEmail())) {
            return new AuthResponseDTO(null, "Email already exists!", "ERROR", null);
        }


        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getRole() == null) {
            user.setRole("USER");
        }

        User savedUser = authRepository.save(user);

        UserDTO userDTO = new UserDTO(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getRole(),
                savedUser.getBusinessName(),
                savedUser.getBusinessRegisterNumber(),
                savedUser.getPhoneNumber(),
                savedUser.getVendorType(),
                savedUser.getBusinessAddress());

        return new AuthResponseDTO(null, "User registered successfully!", "SUCCESS", userDTO);
    }


    public AuthResponseDTO login(String email, String password) {

        Optional<User> optionalUser = authRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return new AuthResponseDTO(null, "User not found!", "ERROR", null);
        }

        User user = optionalUser.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return new AuthResponseDTO(null, "Invalid password!", "ERROR", null);
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getId(), user.getRole());

        UserDTO userDTO = new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getBusinessName(),
                user.getBusinessRegisterNumber(),
                user.getPhoneNumber(),
                user.getVendorType(),
                user.getBusinessAddress());

        return new AuthResponseDTO(token, "Login successful", "SUCCESS", userDTO);
    }
}
