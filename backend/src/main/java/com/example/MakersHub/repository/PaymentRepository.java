package com.example.MakersHub.repository;

import com.example.MakersHub.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment,Long> {
    Optional<Payment> findByPostIdAndCrafterId(Long postId, Long crafterId);
}
