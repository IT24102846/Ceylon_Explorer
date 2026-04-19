package com.ceylonexplorer.repository;

import com.ceylonexplorer.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    // Find vehicle bookings that overlap
    @Query("SELECT b FROM Booking b WHERE b.vehicleId = :vehicleId " +
           "AND b.status != 'CANCELLED' " +
           "AND b.startDate < :endDate AND b.endDate > :startDate")
    List<Booking> findOverlappingVehicleBookings(
            @Param("vehicleId") Long vehicleId, 
            @Param("startDate") String startDate, 
            @Param("endDate") String endDate);

    // Find hotel bookings that overlap
    @Query("SELECT b FROM Booking b WHERE b.hotelId = :hotelId " +
           "AND b.status != 'CANCELLED' " +
           "AND b.checkInDate < :checkOutDate AND b.checkOutDate > :checkInDate")
    List<Booking> findOverlappingHotelBookings(
            @Param("hotelId") Long hotelId, 
            @Param("checkInDate") String checkInDate, 
            @Param("checkOutDate") String checkOutDate);
            
    // Get user bookings by DB user ID (used when user exists in DB)
    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Get bookings by tourist name (used for localStorage-only sessions)
    List<Booking> findByTouristNameOrderByCreatedAtDesc(String touristName);
}
