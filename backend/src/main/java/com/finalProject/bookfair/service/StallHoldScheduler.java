package com.finalProject.bookfair.service;

import com.finalProject.bookfair.enums.StallStatus;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.repository.StallRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class StallHoldScheduler {

    private final StallRepository stallRepository;

    public StallHoldScheduler(StallRepository stallRepository) {
        this.stallRepository = stallRepository;
    }

    @Scheduled(fixedRate = 30000)
    public void releaseExpiredStalls() {
        List<Stall> stalls = stallRepository.findAll();
        for (Stall stall : stalls) {
            if (stall.getStatus() == StallStatus.HOLD
                    && stall.getHoldExpiryTime() != null
                    && stall.getHoldExpiryTime().isBefore(LocalDateTime.now())) {

                stall.setStatus(StallStatus.AVAILABLE);
                stall.setHeldByUser(null);
                stall.setHoldExpiryTime(null);
                stallRepository.save(stall);

                System.out.println("Released expired hold for stall: " + stall.getStallName());
            }
        }
    }
}
