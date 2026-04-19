package com.ceylonexplorer.controller;

import com.ceylonexplorer.model.Hotel;
import com.ceylonexplorer.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    @Autowired
    private HotelService service;

    @GetMapping
    public List<Hotel> getAll(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) Integer rating) {
        
        List<Hotel> hotels = service.findAll();
        
        if (location != null && !location.trim().isEmpty()) {
            hotels = hotels.stream()
                    .filter(h -> h.getLocation() != null && h.getLocation().toLowerCase().contains(location.toLowerCase()))
                    .toList();
        }
        if (rating != null) {
            hotels = hotels.stream()
                    .filter(h -> h.getStars() == rating)
                    .toList();
        }
        return hotels;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hotel> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Hotel create(@RequestBody Hotel entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Hotel> update(@PathVariable Long id, @RequestBody Hotel entity) {
        return service.findById(id)
                .map(existing -> {
                    entity.setId(id);
                    return ResponseEntity.ok(service.save(entity));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.findById(id).isPresent()) {
            service.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
