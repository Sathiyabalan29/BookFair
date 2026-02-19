package com.finalProject.bookfair.repository;

import com.finalProject.bookfair.model.Genre;
import com.finalProject.bookfair.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    List<Genre> findByUsers_Id(Long userId);

}
