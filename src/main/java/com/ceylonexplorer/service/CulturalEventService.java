package com.ceylonexplorer.service;

import com.ceylonexplorer.model.CulturalEvent;
import com.ceylonexplorer.repository.CulturalEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CulturalEventService {

    @Autowired
    private CulturalEventRepository repository;

    public List<CulturalEvent> findAll() {
        return repository.findAll();
    }

    public Optional<CulturalEvent> findById(Long id) {
        return repository.findById(id);
    }

    public CulturalEvent save(CulturalEvent entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
