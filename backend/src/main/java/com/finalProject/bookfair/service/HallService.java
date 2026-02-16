package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.HallDTO;
import com.finalProject.bookfair.repository.HallRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HallService {

    private final HallRepository hallRepository;

    public HallService(HallRepository hallRepository) {
        this.hallRepository = hallRepository;
    }

    public List<HallDTO> getAllHalls() {
        return hallRepository.findAll()
                .stream()
                .map(hall -> new HallDTO(
                        hall.getId(),
                        hall.getName(),
                        hall.getX(),
                        hall.getY(),
                        hall.getWidth(),
                        hall.getHeight()
                ))
                .collect(Collectors.toList());
    }
}