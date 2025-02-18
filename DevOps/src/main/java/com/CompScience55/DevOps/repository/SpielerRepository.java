package com.CompScience55.DevOps.repository;

import com.CompScience55.DevOps.model.Spieler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpielerRepository extends JpaRepository<Spieler, Long> {
}
