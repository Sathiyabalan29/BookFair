package com.finalProject.bookfair.service;


import com.finalProject.bookfair.dto.QrPassResponseDTO;
import com.finalProject.bookfair.model.QrPass;
import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.repository.AuthRepository;
import com.finalProject.bookfair.repository.QrPassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
public class QrPassService {

    @Autowired
    private QrPassRepository qrPassRepository;

    @Autowired
    private AuthRepository authRepository;

    public QrPassResponseDTO createPass(Long userId) {

        User user = authRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        QrPass pass = qrPassRepository.findByUserId(userId)
                .orElseGet(() -> {
                    QrPass p = new QrPass();
                    p.setUser(user);
                    p.setToken(UUID.randomUUID().toString());
                    p.setActive(true);
                    p.setValidFrom(LocalDate.now());
                    p.setValidUntil(LocalDate.now().plusDays(5));
                    return qrPassRepository.save(p);
                });

        return new QrPassResponseDTO(
                pass.getToken(),
                pass.getValidFrom(),
                pass.getValidUntil(),
                pass.isActive(),
                user.getName(),
                user.getEmail()
        );
    }

    public void deactivatePass(Long userId) {
        QrPass pass = qrPassRepository.findByUserIdAndActiveTrue(userId)
                .orElse(null);

        if (pass != null) {
            pass.setActive(false);
            qrPassRepository.save(pass);
        }
    }

    public boolean validate(String token) {

        Optional<QrPass> opt = qrPassRepository.findByToken(token);
        if (opt.isEmpty()) return false;

        QrPass pass = opt.get();
        LocalDate today = LocalDate.now();

        return pass.isActive()
                && !today.isBefore(pass.getValidFrom())
                && !today.isAfter(pass.getValidUntil());
    }
}
