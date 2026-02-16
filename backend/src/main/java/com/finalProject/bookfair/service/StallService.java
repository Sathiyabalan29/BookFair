package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.StallDTO;
import com.finalProject.bookfair.repository.StallRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StallService {

    private final StallRepository stallRepository;

    public StallService(StallRepository stallRepository) {
        this.stallRepository = stallRepository;
    }

    public List<StallDTO> getStallMap() {
        return stallRepository.findAllProjected();
    }
}
