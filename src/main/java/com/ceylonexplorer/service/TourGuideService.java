package com.ceylonexplorer.service;

import com.ceylonexplorer.model.TourGuide;
import com.ceylonexplorer.repository.TourGuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TourGuideService {

    @Autowired
    private TourGuideRepository repository;

    public List<TourGuide> findAll() {
        return repository.findAll();
    }

    public Optional<TourGuide> findById(Long id) {
        return repository.findById(id);
    }

    public TourGuide save(TourGuide entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
