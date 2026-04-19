package com.ceylonexplorer.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    @NotNull(message = "Booking is required")
    private Booking booking;

    @Min(value = 0, message = "Amount cannot be negative")
    private double amount;
    
    @NotBlank(message = "Payment method is required")
    private String paymentMethod; // CARD, PAYPAL, BANK_TRANSFER, CASH
    
    @NotBlank(message = "Transaction ID is required")
    private String transactionId; 

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.PENDING;

    @Builder.Default
    private LocalDateTime paymentDate = LocalDateTime.now();

    public enum Status { PENDING, SUCCESS, FAILED, REFUNDED }
}
