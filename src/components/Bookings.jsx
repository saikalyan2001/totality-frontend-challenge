import React, { useContext } from 'react';
import { CartContext } from '../components/CartProvider';
import './Bookings.css'; 
const Bookings = () => {
  const { bookings, removeBookingFromCart } = useContext(CartContext);

  return (
    <div className="bookings-container">
      {bookings.length === 0 ? (
        <p className="empty-bookings">You have no bookings.</p>
      ) : (
        <ul className='booking-details-card'>
          {bookings.map((booking, index) => (
            <li key={booking.id + '-' + index} className="booking-item"> {/* Unique key */}
              <div className='booked-property-details'>
                <p><strong>Property Title:</strong> {booking.propertyTitle}</p>
                <p><strong>Booked Date:</strong> {new Date(booking.bookedDate).toLocaleString()}</p>
                <p><strong>Check-in Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                <p><strong>Check-out Date:</strong> {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                <p><strong>Guest Name:</strong> {booking.name}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <button className='booking-remove-btn' onClick={() => removeBookingFromCart(booking.id)}>Remove Booking</button> {/* Unique ID */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
