package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.ReservationRequestDTO;
import com.finalProject.bookfair.dto.ReservationResponseDTO;
import com.finalProject.bookfair.enums.ReservationStatus;
import com.finalProject.bookfair.enums.StallStatus;
import com.finalProject.bookfair.model.Reservation;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.repository.AuthRepository;
import com.finalProject.bookfair.repository.ReservationRepository;
import com.finalProject.bookfair.repository.StallRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private AuthRepository authRepository;


    //  Reserve stalls
    @Transactional
    public ReservationResponseDTO reserveStalls(ReservationRequestDTO dto) {

        User user = authRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (dto.getStallNames() == null || dto.getStallNames().isEmpty()) {
            throw new RuntimeException("No stalls selected");
        }

        // Check max 3 reservations per user
        List<Stall> userHeldStalls = stallRepository.findByHeldByUserAndStatus(user, StallStatus.HOLD);
        if (userHeldStalls.size() + dto.getStallNames().size() > 3) {
            throw new RuntimeException("Cannot hold more than 3 stalls per user");
        }

        List<Stall> stalls = dto.getStallNames().stream()
                .map(name -> stallRepository.findByStallName(name)
                        .orElseThrow(() -> new RuntimeException("Stall not found: " + name)))
                .collect(Collectors.toList());

        for (Stall stall : stalls) {
            if (stall.getStatus() != StallStatus.HOLD) {
                throw new RuntimeException("Stall " + stall.getStallName() + " must be on hold before reserving");
            }

            if (stall.getHeldByUser() == null || !user.getId().equals(stall.getHeldByUser().getId())) {
                throw new RuntimeException("Stall " + stall.getStallName() + " hold belongs to another user");
            }
        }

        // Create reservation (status = PENDING_PAYMENT)
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setStatus(ReservationStatus.PENDING_PAYMENT);
        reservation.setReservationDate(LocalDateTime.now());

        BigDecimal total = BigDecimal.ZERO;

        for (Stall stall : stalls) {
            stall.setReservation(reservation);
            stall.setStatus(StallStatus.HOLD); // keep on HOLD until payment
            stall.setHoldExpiryTime(LocalDateTime.now().plusMinutes(15));
            stall.setHeldByUser(user);

            if (stall.getStallPrice() != null) {
                total = total.add(stall.getStallPrice().getPrice());
            }


            reservation.getStalls().add(stall);
        }

        reservation.setPrice(total);

        reservationRepository.save(reservation);
        stallRepository.saveAll(stalls);

        List<String> stallNames = stalls.stream().map(Stall::getStallName).collect(Collectors.toList());

        return new ReservationResponseDTO (
                reservation.getId(),
                user.getName(),
                stallNames,
                reservation.getReservationDate(),
                reservation.getStatus().name(),
                total
        );
    }

    // Confirm reservation after payment
    @Transactional
    public String confirmReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() == ReservationStatus.CANCELLED) {
            throw new RuntimeException("Cannot confirm a cancelled reservation");
        }

        reservation.setStatus(ReservationStatus.CONFIRMED);

        // Mark stalls as BOOKED
        for (Stall stall : reservation.getStalls()) {
            stall.setStatus(StallStatus.BOOKED);
            stall.setHeldByUser(null);
            stall.setHoldExpiryTime(null);
        }

        reservationRepository.save(reservation);
        stallRepository.saveAll(reservation.getStalls());


        return "Reservation confirmed successfully";
    }

    // Get all reservations for a user
    @Transactional
    public List<ReservationResponseDTO> getUserReservations(Long userId) {
        User user = authRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return reservationRepository.findByUser(user)
                .stream()
                .map(r -> new ReservationResponseDTO(
                        r.getId(),
                        user.getName(),
                        r.getStalls().stream().map(Stall::getStallName).collect(Collectors.toList()),
                        r.getReservationDate(),
                        r.getStatus().name(),
                        r.getPrice() != null ? r.getPrice() : BigDecimal.ZERO

                ))
                .collect(Collectors.toList());
    }

    //    Get reservation by reservation id
    @Transactional
    public Reservation getById(Long reservationId) {
        return reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
    }
}