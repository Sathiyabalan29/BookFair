package com.finalProject.bookfair.repository;

import com.finalProject.bookfair.model.QrPass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QrPassRepository extends JpaRepository<QrPass, Long> {
    Optional<QrPass> findByToken(String token);
    Optional<QrPass> findByUserId(Long userId);
}
