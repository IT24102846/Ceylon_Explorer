package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "cultural_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CulturalEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event name is required")
    private String name;
    
    @NotBlank(message = "Category is required")
    private String category;   // Festival, Religious, Cultural, National Holiday
    
    @NotBlank(message = "Date is required")
    private String date;
    
    @NotBlank(message = "Location is required")
    private String location;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status { ACTIVE, INACTIVE }
}