package com.finalProject.bookfair.service;

import com.finalProject.bookfair.dto.*;
import com.finalProject.bookfair.enums.PaymentStatus;
import com.finalProject.bookfair.enums.StallStatus;
import com.finalProject.bookfair.model.Reservation;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.model.User;
import com.finalProject.bookfair.model.Genre;
import com.finalProject.bookfair.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

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
    private RefundRepository refundRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private QrPassRepository qrPassRepository;

    @Autowired
    private GenreRepository genreRepository;

    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<java.util.Map<String, Object>> getGenreReports() {
        return genreRepository.findAll().stream().map(genre -> {
            java.util.Map<String, Object> report = new java.util.HashMap<>();
            report.put("id", genre.getId());
            report.put("genreName", genre.getGenreName());

            List<java.util.Map<String, String>> businesses = genre.getUsers().stream()
                    .map(user -> {
                        java.util.Map<String, String> business = new java.util.HashMap<>();
                        business.put("businessName", user.getBusinessName());
                        business.put("email", user.getEmail());
                        return business;
                    })
                    .collect(Collectors.toList());

            report.put("businesses", businesses);
            report.put("count", businesses.size());
            return report;
        }).collect(Collectors.toList());
    }

    @org.springframework.transaction.annotation.Transactional
    public void addGenre(String genreName) {
        if (genreRepository.findAll().stream().anyMatch(g -> g.getGenreName().equalsIgnoreCase(genreName))) {
            throw new RuntimeException("Genre already exists: " + genreName);
        }
        genreRepository.save(new com.finalProject.bookfair.model.Genre(genreName));
    }

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

    // Stall methods

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

    // Payment methods

    public long getTotalPayments() {
        return paymentRepository.count();
    }

    public BigDecimal getTotalRevenue() {
        return paymentRepository.findByPaymentStatus(PaymentStatus.SUCCESS)
                .stream()
                .map(p -> p.getAmountPaid() != null ? p.getAmountPaid() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Dashboard

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

    public void deleteUser(Long id) {
        User user = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (user.getGenres() != null) {
            user.getGenres().clear();
        }

        List<Stall> heldStalls = stallRepository.findByHeldByUser(user);
        for (Stall stall : heldStalls) {
            stall.setHeldByUser(null);
            stall.setHoldExpiryTime(null);
            stall.setStatus(StallStatus.AVAILABLE);
            stallRepository.save(stall);
        }

        for (Reservation reservation : user.getReservations()) {
            if (reservation.getRefund() != null) {
                refundRepository.delete(reservation.getRefund());
            }
            for (Stall stall : reservation.getStalls()) {
                stall.setReservation(null);
                stall.setStatus(StallStatus.AVAILABLE);
                stallRepository.save(stall);
            }
        }

        if (user.getQrPass() != null) {
            qrPassRepository.delete(user.getQrPass());
        }

        adminRepository.delete(user);
    }
}
