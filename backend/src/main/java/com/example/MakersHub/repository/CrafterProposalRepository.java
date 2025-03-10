package com.example.MakersHub.repository;

import com.example.MakersHub.entity.Crafter;
import com.example.MakersHub.entity.CrafterProposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CrafterProposalRepository extends JpaRepository<CrafterProposal,Long> {
    List<CrafterProposal> findByPost_Id(Long postId);

    Optional<CrafterProposal> findByCrafterId(Long crafterId);

   Optional<CrafterProposal> findByPostIdAndCrafterId(Long postId, Long crafterId);

    List<CrafterProposal> findByPostId(Long postId);

    //In Spring Data JPA, you don't need to define the body of the method findByPost_Id(Long postId)
    // yourself. Spring Data JPA automatically generates the
    // implementation of the method based on the method name and the repository interface you define.

    List<CrafterProposal> findAllByPostIdIn(List<Long> postIds);


    long countByPostId(Long postId);

    boolean existsByPostId(Long postId);
}
