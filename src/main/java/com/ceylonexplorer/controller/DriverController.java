package com.ceylonexplorer.controller;

import com.ceylonexplorer.model.Driver;
import com.ceylonexplorer.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
@CrossOrigin(origins = "*")
public class DriverController {

    @Autowired
    private DriverService service;

    @GetMapping
    public List<Driver> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Driver> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Driver create(@RequestBody Driver entity) {
        if (entity.getStatus() == null || entity.getStatus().trim().isEmpty()) {
            entity.setStatus("ACTIVE");
        }
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Driver> update(@PathVariable Long id, @RequestBody Driver entity) {
        return service.findById(id)
                .map(existing -> {
                    entity.setId(id);
                    if (entity.getStatus() == null || entity.getStatus().trim().isEmpty()) {
                        entity.setStatus(existing.getStatus() != null ? existing.getStatus() : "ACTIVE");
                    }
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
