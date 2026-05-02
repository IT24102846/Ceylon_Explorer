package com.ceylonexplorer.controller;

import com.ceylonexplorer.model.Vehicle;
import com.ceylonexplorer.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleControllers {

    @Autowired
    private VehicleService service;

    @GetMapping
    public List<Vehicle> getAll(@RequestParam(required = false) String type) {
        List<Vehicle> vehicles = service.findAll();
        if (type != null && !type.trim().isEmpty() && !type.equalsIgnoreCase("all")) {
            vehicles = vehicles.stream()
                    .filter(v -> v.getType() != null && v.getType().equalsIgnoreCase(type))
                    .toList();
        }
        return vehicles;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vehicle create(@RequestBody Vehicle entity) {
        return service.save(entity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> update(@PathVariable Long id, @RequestBody Vehicle entity) {
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
