package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Which user made this booking
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // Who made this booking (from localStorage session — name only)
    private String touristName;

    // Booking type: HOTEL, VEHICLE, TOUR_GUIDE, ACTIVITY
    @NotBlank(message = "Booking type is required")
    private String bookingType;

    // Referenced entity IDs (only one will be set at a time)
    private Long hotelId;
    private Long vehicleId;
    private Long guideId;
    private Long activityId;

    // Common booking fields
    private String checkInDate;    // For hotels
    private String checkOutDate;
    private String startDate;      // For guides/activities
    private String endDate;
    private String date;           // For single-day activities

    // Guest / participant counts
    private Integer numberOfGuests;
    private Integer numberOfPeople;
    private Integer numberOfParticipants;

    // Location details
    private String pickupLocation;
    private String dropoffLocation;

    // Extras
    private String roomType;
    private String tourType;
    private String specialRequests;
    private String specialRequirements;
    // Vehicle specifics
    private Boolean includeDriver;

    // Payment
    @Min(value = 0, message = "Total price cannot be negative")
    private double totalPrice;
    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.CONFIRMED;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum Status { CONFIRMED, PENDING, CANCELLED }
}