package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "emergency_services")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmergencyService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Service name is required")
    private String name;
    
    @NotBlank(message = "Type is required")
    private String type;       // hospital, spa, ayurveda, pharmacy, clinic
    
    @NotBlank(message = "Phone number is required")
    private String phone;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    private String hours;

    @Column(columnDefinition = "TEXT")
    private String description;

    // GPS coordinates for map — optional (Leaflet uses these)
    private Double latitude;
    private Double longitude;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status { ACTIVE, INACTIVE }
}