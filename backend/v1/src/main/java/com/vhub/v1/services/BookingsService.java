package com.vhub.v1.services;

import com.vhub.v1.repository.*;
import com.vhub.v1.model.*;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingsService {

    
    @Autowired
    BookingsRepo br;
   
    public Bookings create(Bookings k)
    {
        return br.save(k);
    }
    public List<Bookings> getAllBookings()
    {
        return br.findAll();
    }

    public Optional<Bookings> getBookingsById(int id) 
    {
        return br.findById(id);
    }

    public Bookings updateBookings(int id, Bookings u)
    {
        if (br.existsById(id)) 
        {
            u.setBookingId(id);
            return br.save(u);
        }
        return null;
    }

    public boolean deleteBookings(int bookingId) 
    {
        if (br.existsById(bookingId))
        {
            br.deleteById(bookingId);
            return true;
        }
        return false;
    }
}
