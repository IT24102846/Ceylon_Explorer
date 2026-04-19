package com.ceylonexplorer.service;

import com.ceylonexplorer.model.Activity;
import com.ceylonexplorer.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository repository;

    public List<Activity> findAll() {
        return repository.findAll();
    }

    public Optional<Activity> findById(Long id) {
        return repository.findById(id);
    }

    public Activity save(Activity entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
