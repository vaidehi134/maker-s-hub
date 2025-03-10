package com.example.MakersHub.repository;

import com.example.MakersHub.entity.PostAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostAssignmentRepository extends JpaRepository<PostAssignment, Long> {
    List<PostAssignment> findByCrafterId(Long crafterId);
}
