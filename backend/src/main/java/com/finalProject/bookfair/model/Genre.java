package com.finalProject.bookfair.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "genres")
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "genre_name", nullable = false, unique = true)
    private String genreName;

    @ManyToMany(mappedBy = "genres")
    private Set<User> users = new HashSet<>();

    protected Genre() {

    }

    public Genre(String genreName) {
        this.genreName = genreName;
    }

}
