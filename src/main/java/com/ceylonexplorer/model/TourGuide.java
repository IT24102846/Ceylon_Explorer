package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "tour_guides")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourGuide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Guide name is required")
    private String name;
    
    @NotBlank(message = "Languages are required")
    private String languages;      // "English, French, German"
    
    @NotBlank(message = "Specialty is required")
    private String specialty;      // "Cultural Tours", "Wildlife Safari"
    
    @Min(value = 0, message = "Experience cannot be negative")
    private int experience;        // years
    
    private int experienceYears;   // same, used by frontend

    @Column(name = "rate_per_day")
    @Min(value = 0, message = "Rate cannot be negative")
    private double rate;
    
    private double pricePerDay;    // same as rate

    @NotBlank(message = "Phone number is required")
    private String phone;
    private String certifications; // comma-separated
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    private double rating = 5.0;

    @Builder.Default
    private boolean verified = true;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status { ACTIVE, INACTIVE }
}