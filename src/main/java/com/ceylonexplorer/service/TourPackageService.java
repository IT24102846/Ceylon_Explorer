package com.ceylonexplorer.service;

import com.ceylonexplorer.model.TourPackage;
import com.ceylonexplorer.repository.TourPackageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TourPackageService {

    @Autowired
    private TourPackageRepository repository;

    public List<TourPackage> findAll() {
        return repository.findAll();
    }

    public Optional<TourPackage> findById(Long id) {
        return repository.findById(id);
    }

    public TourPackage save(TourPackage entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
