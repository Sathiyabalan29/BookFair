package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.*;
import com.finalProject.bookfair.enums.PaymentStatus;
import com.finalProject.bookfair.enums.StallStatus;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private StallRepository stallRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthRepository authRepository;

    public List<UserDTO> getAllUsers() {
        return adminRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getUsersByGenre(Long genreId) {
        if (genreId == null) {
            return getAllUsers();
        }
        return adminRepository.findAll().stream()
                .filter(user -> user.getGenres().stream().anyMatch(g -> g.getId().equals(genreId)))
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private UserDTO mapToDTO(User user) {
        java.util.Set<GenreDTO> genreDTOs = user.getGenres().stream()
                .map(g -> new GenreDTO(g.getId(), g.getGenreName()))
                .collect(Collectors.toSet());

        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getBusinessName(),
                user.getBusinessRegisterNumber(),
                user.getPhoneNumber(),
                user.getVendorType(),
                user.getBusinessAddress(),
                genreDTOs);
    }



    public List<AdminReservationDTO> getAllReservations() {
        return reservationRepository.findAll().stream()
                .map(r -> {
                    String qrCode = null;
                    if (r.getUser() != null && r.getUser().getQrPass() != null) {
                        qrCode = r.getUser().getQrPass().getToken();
                    }

                    List<String> stallNames = r.getStalls().stream()
                            .map(Stall::getStallName)
                            .collect(Collectors.toList());

                    double priceVal = r.getPrice() != null ? r.getPrice().doubleValue() : 0.0;
                    String statusVal = r.getStatus() != null ? r.getStatus().name() : "UNKNOWN";

                    return new AdminReservationDTO(
                            r.getId(),
                            r.getUser() != null ? r.getUser().getName() : null,
                            r.getUser() != null ? r.getUser().getEmail() : null,
                            stallNames,
                            r.getReservationDate(),
                            qrCode,
                            statusVal,
                            priceVal);
                })
                .collect(Collectors.toList());
    }

    public long getTotalReservations() {
        return reservationRepository.count();
    }

    public long getRecentReservationsCount() {
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        return reservationRepository.findAll().stream()
                .filter(r -> r.getReservationDate() != null && r.getReservationDate().isAfter(weekAgo))
                .count();
    }



    public List<AdminStallDTO> getAllStalls() {
        return convertToAdminStallDTOs(stallRepository.findAll());
    }

    public List<AdminStallDTO> getAvailableStalls() {
        return convertToAdminStallDTOs(stallRepository.findByStatus(StallStatus.AVAILABLE));
    }

    public List<AdminStallDTO> getReservedStalls() {
        return convertToAdminStallDTOs(stallRepository.findByStatus(StallStatus.BOOKED));
    }

    public long getAvailableStallCount() {
        return stallRepository.countByStatus(StallStatus.AVAILABLE);
    }

    public long getReservedStallCount() {
        return stallRepository.countByStatus(StallStatus.BOOKED);
    }

    public List<StallDTO> getStallMapData() {
        return stallRepository.findAll().stream()
                .map(s -> new StallDTO(
                        s.getStallName(),
                        s.getStatus(),
                        s.getX(),
                        s.getY(),
                        s.getWidth(),
                        s.getHeight()))
                .collect(Collectors.toList());
    }

    private List<AdminStallDTO> convertToAdminStallDTOs(List<Stall> stalls) {
        return stalls.stream()
                .map(s -> {
                    String heldBy = s.getHeldByUser() != null ? s.getHeldByUser().getName() : null;
                    BigDecimal price = s.getStallPrice() != null ? s.getStallPrice().getPrice() : BigDecimal.ZERO;
                    return new AdminStallDTO(
                            s.getId(),
                            s.getStallName(),
                            s.getStatus(),
                            s.getX(),
                            s.getY(),
                            s.getWidth(),
                            s.getHeight(),
                            heldBy,
                            price);
                })
                .collect(Collectors.toList());
    }



    public long getTotalPayments() {
        return paymentRepository.count();
    }

    public BigDecimal getTotalRevenue() {
        return paymentRepository.findByPaymentStatus(PaymentStatus.SUCCESS)
                .stream()
                .map(p -> p.getAmountPaid() != null ? p.getAmountPaid() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }



    public AdminDashboardDTO getDashboardStats() {
        return new AdminDashboardDTO(
                getTotalUsers(),
                getTotalReservations(),
                getAvailableStallCount(),
                getReservedStallCount(),
                getTotalPayments(),
                getTotalRevenue(),
                getRecentReservationsCount());
    }

    public long getTotalUsers() {
        return adminRepository.count();
    }
}
