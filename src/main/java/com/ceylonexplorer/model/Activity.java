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

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status { ACTIVE, INACTIVE }
}