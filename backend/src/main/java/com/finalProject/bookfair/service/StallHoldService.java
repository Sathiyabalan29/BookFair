package com.finalProject.bookfair.service;

import com.finalProject.bookfair.enums.StallStatus;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.repository.AuthRepository;
import com.finalProject.bookfair.repository.StallRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StallHoldService {

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private AuthRepository authRepository;

    @Transactional
    public String holdStalls(Long userId, List<String> stallNames) {

        User user = authRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Stall> heldStalls = stallRepository.findByHeldByUserAndStatus(user, StallStatus.HOLD);
        if (heldStalls.size() + stallNames.size() > 3) {
            throw new RuntimeException("Cannot hold more than 3 stalls per user");
        }

        for (String stallName : stallNames) {
            Stall stall = stallRepository.findByStallName(stallName)
                    .orElseThrow(() -> new RuntimeException("Stall not found: " + stallName));

            if (stall.getHoldExpiryTime() != null &&
                    stall.getHoldExpiryTime().isBefore(LocalDateTime.now())) {
                stall.setStatus(StallStatus.AVAILABLE);
                stall.setHeldByUser(null);
                stall.setHoldExpiryTime(null);
            }

            if (stall.getStatus() == StallStatus.BOOKED) {
                throw new RuntimeException("Stall already booked: " + stallName);
            }

            if (stall.getStatus() == StallStatus.HOLD &&
                    (stall.getHeldByUser() == null || !userId.equals(stall.getHeldByUser().getId()))) {
                throw new RuntimeException("Stall held by another user: " + stallName);
            }

            stall.setStatus(StallStatus.HOLD);
            stall.setHeldByUser(user);
            stall.setHoldExpiryTime(LocalDateTime.now().plusMinutes(15));

            stallRepository.save(stall);
        }

        return "Stalls held successfully";
    }
}
