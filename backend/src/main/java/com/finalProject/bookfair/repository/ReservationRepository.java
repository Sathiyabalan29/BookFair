package com.finalProject.bookfair.repository;

import com.finalProject.bookfair.enums.ReservationStatus;
import com.finalProject.bookfair.model.Reservation;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {


    @Query("SELECT r FROM Reservation r LEFT JOIN FETCH r.stalls WHERE r.user = :user")
    List<Reservation> findByUser(@org.springframework.data.repository.query.Param("user") User user);

    boolean existsByUserAndStatus(User user, ReservationStatus status);

}