package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "hotels")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Hotel name is required")
    private String name;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @Min(value = 1, message = "Stars must be at least 1")
    @Max(value = 5, message = "Stars cannot exceed 5")
    private int stars;

    @Column(name = "price_per_night")
    @Min(value = 0, message = "Price cannot be negative")
    private double pricePerNight;

    @NotBlank(message = "Category is required")
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String amenities;    // comma-separated: "WiFi,Pool,Spa"
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    // Derived field used by frontend
    public int getRating() { return stars; }

    public enum Status { ACTIVE, INACTIVE }
}