package com.ceylonexplorer.service;

import com.ceylonexplorer.model.Itinerary;
import com.ceylonexplorer.repository.ItineraryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ItineraryService {

    @Autowired
    private ItineraryRepository repository;

    public List<Itinerary> findAll() {
        return repository.findAll();
    }

    public Optional<Itinerary> findById(Long id) {
        return repository.findById(id);
    }

    public Itinerary save(Itinerary entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
