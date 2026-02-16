package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private AuthRepository authRepository;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return authRepository.findAll();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return authRepository.findById(id).orElseThrow();
    }
}
