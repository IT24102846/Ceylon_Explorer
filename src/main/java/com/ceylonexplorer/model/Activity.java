package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Activity name is required")
    private String name;


    @NotBlank(message = "Activity type is required")
    private String type;
    private String category;

    @NotBlank(message = "Location is required")
    private String location;
    
    @NotBlank(message = "Duration is required")
    private String duration;
    
    @Min(value = 1, message = "Participants must be at least 1")
    private int maxParticipants;

    @Column(name = "price_per_person")
    @Min(value = 0, message = "Price cannot be negative")
    private double pricePerPerson;

    private String included;   // comma-separated: "Guide,Equipment,Transport"
    private String imageUrl;

    @Column(columnDefinition = "TEXT")
    private String description;

    // 1. AI & Filtering
    private String tags; // e.g., "Adventure,Water"
    private String difficultyLevel; // e.g., "Beginner", "Expert"

    // 2. Weather & Crowd
    private boolean weatherDependent;
    private String currentCrowdLevel; // e.g., "Low", "Moderate", "High"

    // 3. Dynamic Pricing & Yield Management
    @Column(name = "high_season_multiplier")
    private double highSeasonMultiplier = 1.0;
    
    @Column(name = "discount_percentage")
    private double discountPercentage = 0.0;
    
    private int availableSlots;

    // 4. VR / Media
    private String vrVideoUrl;

    // 5. Social / Buddy
    private boolean isGroupActivity;

    // 6. Guides / Maps
    private String gpsCoordinates;
    private String audioGuideUrl;

    // 7. Gamification
    private int rewardPoints;

    // 8. Ticketing
    private boolean requiresTicket;

    // 9. Eco-Friendly
    private double carbonFootprint;
    private double communityContributionPercentage;

    // 10. Add-ons
    private String availableAddons;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status { ACTIVE, INACTIVE }
}