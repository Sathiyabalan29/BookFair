package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.GenreDTO;
import com.finalProject.bookfair.model.Genre;
import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.repository.AuthRepository;
import com.finalProject.bookfair.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class GenreService {

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private AuthRepository authRepository;

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

    public Set<GenreDTO> updateUserGenres(Long userId, List<Long> genreIds) {

        User user = authRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));


        Set<Genre> genres = new HashSet<>(genreRepository.findAllById(genreIds));


        user.setGenres(genres);


        authRepository.save(user);


        return genres.stream()
                .map(g -> new GenreDTO(g.getId(), g.getGenreName()))
                .collect(Collectors.toSet());
    }

}
