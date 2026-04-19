package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "tour_packages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Package name is required")
    private String name;
    
    @NotBlank(message = "Duration is required")
    private String duration; // e.g., "7 Days / 6 Nights"
    
    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Description is required")
    private String description;
    
    @Min(value = 0, message = "Price cannot be negative")
    private double pricePerPerson;
    
    // What is included in this package
    @Column(columnDefinition = "TEXT")
    @NotBlank(message = "Included items are required")
    private String included; // Hotel, Meals, Transport, Guide
    
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status { ACTIVE, INACTIVE }
}
