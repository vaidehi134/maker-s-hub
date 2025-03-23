package com.example.MakersHub.repository;

import com.example.MakersHub.entity.CrafterWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CrafterWorkRepository extends JpaRepository<CrafterWork, Long> {
    Optional<CrafterWork> findByPostIdAndCrafterId(Long postId, Long crafterId);

    Optional<CrafterWork> findByPostId(Long postId);

    List<CrafterWork> findByCrafterId(Long crafterId);


}
