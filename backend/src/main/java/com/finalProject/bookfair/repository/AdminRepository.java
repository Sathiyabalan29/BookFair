package com.finalProject.bookfair.repository;

import com.finalProject.bookfair.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdminRepository extends JpaRepository<User, Long> {

    List<User> findByRole(String role);
}