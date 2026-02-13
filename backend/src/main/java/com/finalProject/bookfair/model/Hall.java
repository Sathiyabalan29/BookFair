package com.finalProject.bookfair.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "halls")
public class Hall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "hall", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Stall> stalls;

    private String name;
    private int x;
    private int y;
    private int width;
    private int height;

}




