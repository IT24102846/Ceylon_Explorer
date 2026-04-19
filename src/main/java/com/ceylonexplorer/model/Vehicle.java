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
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status { ACTIVE, INACTIVE }
}
