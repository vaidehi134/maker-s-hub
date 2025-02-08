package com.example.MakersHub.repository;


import com.example.MakersHub.entity.Client;
import com.example.MakersHub.entity.Crafter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CrafterRepository extends JpaRepository<Crafter, Long> {
    Crafter findFirstByEmail(String email);
}
