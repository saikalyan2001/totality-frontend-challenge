import React, { useState, useContext } from 'react';
import './BookingForm.css'; 
import { CartContext } from './CartProvider'; 

const BookingForm = ({ property, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { addBookingToCart } = useContext(CartContext); 

  const handleBooking = () => {
    // Reset error and message states
    setError('');
    setMessage('');

    // Basic validation checks
    if (!name || !email || !checkInDate || !checkOutDate) {
      setError("Please fill in all fields.");
      return;
    }

    // Additional validation checks
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const bookingDetails = {
      propertyId: property.id,
      propertyTitle: property.title,
      name,
      email,
      checkInDate,
      checkOutDate,
      bookedDate: new Date().toISOString(), 
    };

    try {
      // Add booking to the cart context
      addBookingToCart(bookingDetails);

      setMessage('Booking Successful!');
      setTimeout(() => {
        setMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error saving booking:", error);
      setError("An error occurred while processing your booking. Please try again.");
    }
  };

  return (
    <div className="booking-overlay">
      <div className="booking-form">
        <h2>Book {property.title}</h2>
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Check-in Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Check-out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <button className="book-btn" onClick={handleBooking}>Book Now</button>
        {error && <p className="booking-error">{error}</p>}
        {message && <p className="booking-message">{message}</p>}
      </div>
    </div>
  );
};

export default BookingForm;
