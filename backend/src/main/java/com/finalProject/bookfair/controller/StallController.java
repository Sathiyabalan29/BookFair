package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.StallDTO;
import com.finalProject.bookfair.service.StallService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stalls")
public class StallController {

    private final StallService stallService;

    public StallController(StallService stallService) {
        this.stallService = stallService;
    }

    // GET → load map
    @GetMapping("/map")
    public List<StallDTO> getMap() {
        return stallService.getStallMap();
    }
}
