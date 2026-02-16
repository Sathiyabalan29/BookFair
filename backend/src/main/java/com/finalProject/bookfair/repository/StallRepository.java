package com.finalProject.bookfair.repository;


import com.finalProject.bookfair.enums.StallStatus;
import com.finalProject.bookfair.model.Stall;
import com.finalProject.bookfair.model.User;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StallRepository extends JpaRepository<Stall, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Stall> findByStallName(String stallName);

    List<Stall> findByStatus(StallStatus status);

    long countByStatus(StallStatus status);

    List<Stall> findByHeldByUser(User heldByUser);

    List<Stall> findByHeldByUser_Id(Long heldByUserId);

    List<Stall> findByHeldByUserAndStatus(User heldByUser, StallStatus status);

    @Query("SELECT new com.finalProject.bookfair.dto.StallDTO(s.stallName, s.status, s.x, s.y, s.width, s.height) FROM Stall s")
    List<com.finalProject.bookfair.dto.StallDTO> findAllProjected();

    @Query("SELECT s FROM Stall s JOIN FETCH s.stallPrice WHERE s.stallName = :name")
    Optional<Stall> findByStallNameWithPrice(@Param("name") String name);

}

