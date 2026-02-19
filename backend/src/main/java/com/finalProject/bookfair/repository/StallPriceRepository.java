package com.finalProject.bookfair.repository;

import com.finalProject.bookfair.enums.StallSize;
import com.finalProject.bookfair.model.StallPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StallPriceRepository extends JpaRepository<StallPrice, Long> {
    Optional<StallPrice> findBySize(StallSize size);
}