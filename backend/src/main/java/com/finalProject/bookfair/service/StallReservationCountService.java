package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.UserReservationsDTO;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.repository.StallRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StallReservationCountService {

    private final StallRepository stallRepository;

    public StallReservationCountService(StallRepository stallRepository) {
        this.stallRepository = stallRepository;
    }

    public UserReservationsDTO countUserReservations(String userId) {
        Long id = Long.parseLong(userId);
        List<Stall> reservedStalls = stallRepository.findByHeldByUser_Id(id);
        int count = reservedStalls.size();

        UserReservationsDTO dto = new UserReservationsDTO();
        dto.setCount(count);
        dto.setStalls(reservedStalls);

        return dto;
    }
}