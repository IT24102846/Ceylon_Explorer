package com.ceylonexplorer.service;

import com.ceylonexplorer.model.Hotel;
import com.ceylonexplorer.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class HotelService {

    @Autowired
    private HotelRepository repository;

    public List<Hotel> findAll() {
        return repository.findAll();
    }

    public Optional<Hotel> findById(Long id) {
        return repository.findById(id);
    }

    public Hotel save(Hotel entity) {
        return repository.save(entity);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
