package com.ceylonexplorer.controller;

import com.ceylonexplorer.model.CulturalEvent;
import com.ceylonexplorer.service.CulturalEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cultural-events")
@CrossOrigin(origins = "*")
public class CulturalEventController {

    @Autowired
    private CulturalEventService service;

    @GetMapping
    public List<CulturalEvent> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CulturalEvent> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public CulturalEvent create(@RequestBody CulturalEvent entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CulturalEvent> update(@PathVariable Long id, @RequestBody CulturalEvent entity) {
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
