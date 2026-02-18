package com.finalProject.bookfair.controller;

import com.finalProject.bookfair.dto.*;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.service.AdminService;
import com.finalProject.bookfair.service.StallService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@org.springframework.security.access.prepost.PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private StallService stallService;

    @GetMapping("/dashboard")
    public AdminDashboardDTO getDashboard() {
        return adminService.getDashboardStats();
    }

    @GetMapping("/users")
    public List<UserDTO> getUsers(@RequestParam(required = false) Long genreId) {
        return adminService.getUsersByGenre(genreId);
    }

    @GetMapping("/reservations")
    public List<AdminReservationDTO> getReservations() {
        return adminService.getAllReservations();
    }

    @GetMapping("/stalls")
    public List<AdminStallDTO> getAllStalls() {
        return adminService.getAllStalls();
    }

    @GetMapping("/stalls/available")
    public List<AdminStallDTO> getAvailableStalls() {
        return adminService.getAvailableStalls();
    }

    @GetMapping("/stalls/reserved")
    public List<AdminStallDTO> getReservedStalls() {
        return adminService.getReservedStalls();
    }

    @GetMapping("/stalls/map")
    public List<StallDTO> getStallMap() {
        return stallService.getStallMap();
    }

}
