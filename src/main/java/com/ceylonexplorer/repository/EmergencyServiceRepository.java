package com.ceylonexplorer.repository;

import com.ceylonexplorer.model.EmergencyService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyServiceRepository extends JpaRepository<EmergencyService, Long> {
}
