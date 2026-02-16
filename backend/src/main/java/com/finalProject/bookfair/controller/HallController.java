package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.HallDTO;
import com.finalProject.bookfair.service.HallService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/halls")
public class HallController {

    private final HallService hallService;

    public HallController(HallService hallService) {
        this.hallService = hallService;
    }

    @GetMapping("/map")
    public List<HallDTO> getHalls() {
        return hallService.getAllHalls();
    }
}
