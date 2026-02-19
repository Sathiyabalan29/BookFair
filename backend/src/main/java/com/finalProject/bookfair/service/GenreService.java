package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.GenreDTO;
import com.finalProject.bookfair.model.Genre;
import com.finalProject.bookfair.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreService {

    @Autowired
    private GenreRepository genreRepository;

    public GenreDTO addGenre(GenreDTO genreDTO) {
        Genre genre = new Genre(genreDTO.getName());
        Genre savedGenre = genreRepository.save(genre);
        return new GenreDTO(savedGenre.getId(), savedGenre.getGenreName());
    }

    public List<GenreDTO> getAllGenres() {
        return genreRepository.findAll().stream()
                .map(g -> new GenreDTO(g.getId(), g.getGenreName()))
                .collect(java.util.stream.Collectors.toList());
    }

    public List<GenreDTO> getGenresByUserId(Long userId) {
        return genreRepository.findByUsers_Id(userId).stream()
                .map(g -> new GenreDTO(g.getId(), g.getGenreName()))
                .collect(java.util.stream.Collectors.toList());
    }

}
