package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.StallDTO;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.model.StallPrice;
import com.finalProject.bookfair.repository.StallPriceRepository;
import com.finalProject.bookfair.repository.StallRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StallService {

    private final StallRepository stallRepository;

    private final StallPriceRepository stallPriceRepository;

    public StallService(StallRepository stallRepository,
                        StallPriceRepository stallPriceRepository) {
        this.stallRepository = stallRepository;
        this.stallPriceRepository = stallPriceRepository;
    }

    public List<StallDTO> getStallMap() {
        return stallRepository.findAllProjected();
    }

    public Stall createStall(Stall stall) {

        StallPrice price = stallPriceRepository
                .findBySize(stall.getStallSize())
                .orElseThrow(() -> new RuntimeException("Price not found for size"));

        stall.setStallPrice(price);

        return stallRepository.save(stall);
    }
}