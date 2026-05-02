package com.ceylonexplorer.service;

import com.ceylonexplorer.model.Driver;
import com.ceylonexplorer.repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepository repository;

    public List<Driver> findAll() {
        return repository.findAll();
    }

    public Optional<Driver> findById(Long id) {
        return repository.findById(id);
    }

    public Driver save(Driver entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
