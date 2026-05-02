package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Vehicle name is required")
    private String name;
    
    @NotBlank(message = "Brand is required")
    private String brand;
    
    @NotBlank(message = "Type is required")
    private String type;
    
    @Min(value = 1, message = "Seats must be at least 1")
    private int seats;
    private int capacity;
    
    @NotBlank(message = "Model is required")
    private String model;
    
    @Min(value = 1900, message = "Year must be valid")
    private int year;

    @Column(name = "price_per_day")
    @Min(value = 0, message = "Price cannot be negative")
    private double pricePerDay;

    @Column(name = "driver_bookable")
    private Boolean driverBookable;

    @Column(name = "driver_cost_per_day")
    @Min(value = 0, message = "Driver cost cannot be negative")
    private Double driverCostPerDay;

    private String features;
    
    // ── Media ──
    private String imageUrl;
    private String videoUrl;

    // ── Advanced Features ──
    @Column(name = "available_addons")
    private String availableAddons; // e.g. "Child Seat:10, Wi-Fi:5"

    @Column(name = "high_season_multiplier")
    private Double highSeasonMultiplier; // e.g. 1.2

    @Column(name = "discount_percentage")
    private Double discountPercentage; // e.g. 10.0

    @Column(name = "fuel_efficiency_km_per_litre")
    private Double fuelEfficiencyKmPerLitre; // e.g. 15.0

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status { ACTIVE, INACTIVE }
}
