package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "itineraries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Itinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String touristName; // Replaces complex User entity mapping for prototype efficiency

    @NotBlank(message = "Title is required")
    private String title;          // e.g. "My 5-Day Sri Lanka Trip"
    
    private String duration;       // e.g. "7 Days"

    private String type;           // e.g. "Cultural", "Adventure"
    
    @Column(columnDefinition = "TEXT")
    private String description;    // Trip summary
    
    private String destinations;   // e.g. "Colombo, Kandy, Ella"
    
    private double estimatedCost;  // e.g. 800.00
    
    private String imageUrl;       // for banner/cover image

    private LocalDate startDate;
    
    private LocalDate endDate;

    @Column(columnDefinition = "TEXT")
    private String dailyPlan;      

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.DRAFT;

    public enum Status { DRAFT, FINALIZED, ONGOING, COMPLETED }
}
