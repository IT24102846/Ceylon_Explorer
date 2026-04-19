package com.ceylonexplorer.service;

import com.ceylonexplorer.model.Booking;
import com.ceylonexplorer.repository.BookingRepository;
import com.ceylonexplorer.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository repository;

    @Autowired
    private UserRepository userRepository;

    public List<Booking> findAll() {
        return repository.findAll();
    }

    public Optional<Booking> findById(Long id) {
        return repository.findById(id);
    }

    public Booking save(Booking entity) {
        // Safely resolve the User entity from DB to avoid TransientPropertyValueException (400 errors)
        if (entity.getUser() != null && entity.getUser().getId() != null) {
            userRepository.findById(entity.getUser().getId()).ifPresent(entity::setUser);
        } else {
            entity.setUser(null); // Guest booking – no user linked
        }

        if (entity.getBookingType() != null) {
            String type = entity.getBookingType().toUpperCase();

            if (type.equals("VEHICLE") && entity.getVehicleId() != null
                && entity.getStartDate() != null && entity.getEndDate() != null) {

                List<Booking> overlapping = repository.findOverlappingVehicleBookings(
                        entity.getVehicleId(), entity.getStartDate(), entity.getEndDate());

                if (entity.getId() != null) {
                    overlapping.removeIf(b -> b.getId().equals(entity.getId()));
                }

                if (!overlapping.isEmpty()) {
                    throw new RuntimeException("Vehicle is already booked for the selected dates.");
                }

            } else if (type.equals("HOTEL") && entity.getHotelId() != null
                       && entity.getCheckInDate() != null && entity.getCheckOutDate() != null) {

                List<Booking> overlapping = repository.findOverlappingHotelBookings(
                        entity.getHotelId(), entity.getCheckInDate(), entity.getCheckOutDate());

                if (entity.getId() != null) {
                    overlapping.removeIf(b -> b.getId().equals(entity.getId()));
                }

                if (!overlapping.isEmpty()) {
                    throw new RuntimeException("Hotel is already booked for the selected dates.");
                }
            }
        }
        return repository.save(entity);
    }

    public List<Booking> findByUserId(Long userId) {
        return repository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Booking> findByTouristName(String name) {
        return repository.findByTouristNameOrderByCreatedAtDesc(name);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
