package com.finalProject.bookfair.repository;


import com.finalProject.bookfair.model.EmailLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailLogRepository extends JpaRepository<EmailLog, Long> {}