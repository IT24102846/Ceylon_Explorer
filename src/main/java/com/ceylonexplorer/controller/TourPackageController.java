package com.ceylonexplorer.controller;

import com.ceylonexplorer.model.TourPackage;
import com.ceylonexplorer.service.TourPackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tour-packages")
@CrossOrigin(origins = "*")
public class TourPackageController {

    @Autowired
    private TourPackageService service;

    @GetMapping
    public List<TourPackage> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TourPackage> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TourPackage create(@RequestBody TourPackage entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TourPackage> update(@PathVariable Long id, @RequestBody TourPackage entity) {
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
