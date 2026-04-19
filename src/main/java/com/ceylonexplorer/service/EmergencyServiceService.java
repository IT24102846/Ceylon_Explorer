package com.ceylonexplorer.service;

import com.ceylonexplorer.model.EmergencyService;
import com.ceylonexplorer.repository.EmergencyServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class EmergencyServiceService {

    @Autowired
    private EmergencyServiceRepository repository;

    public List<EmergencyService> findAll() {
        return repository.findAll();
    }

    public Optional<EmergencyService> findById(Long id) {
        return repository.findById(id);
    }

    public EmergencyService save(EmergencyService entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
