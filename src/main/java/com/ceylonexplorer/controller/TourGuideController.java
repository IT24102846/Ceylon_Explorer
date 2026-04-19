package com.ceylonexplorer.controller;

import com.ceylonexplorer.model.TourGuide;
import com.ceylonexplorer.service.TourGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tour-guides")
@CrossOrigin(origins = "*")
public class TourGuideController {

    @Autowired
    private TourGuideService service;

    @GetMapping
    public List<TourGuide> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourGuide> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TourGuide create(@RequestBody TourGuide entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TourGuide> update(@PathVariable Long id, @RequestBody TourGuide entity) {
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
