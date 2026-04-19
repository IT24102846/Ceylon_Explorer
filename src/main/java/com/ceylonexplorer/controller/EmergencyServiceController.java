package com.ceylonexplorer.controller;

import com.ceylonexplorer.model.EmergencyService;
import com.ceylonexplorer.service.EmergencyServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency-services")
@CrossOrigin(origins = "*")
public class EmergencyServiceController {

    @Autowired
    private EmergencyServiceService service;

    @GetMapping
    public List<EmergencyService> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmergencyService> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public EmergencyService create(@RequestBody EmergencyService entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmergencyService> update(@PathVariable Long id, @RequestBody EmergencyService entity) {
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
