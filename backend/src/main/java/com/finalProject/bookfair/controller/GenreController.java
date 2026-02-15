package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.GenreDTO;
import com.finalProject.bookfair.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/genres")
@CrossOrigin
public class GenreController {

    @Autowired
    private GenreService genreService;

    @PostMapping("/add")
    public GenreDTO addGenre(@RequestBody GenreDTO genreDTO) {
        return genreService.addGenre(genreDTO);
    }

    @GetMapping("/all")
    public List<GenreDTO> getAllGenres() {
        return genreService.getAllGenres();
    }
}
