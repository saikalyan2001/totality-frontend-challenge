import React from 'react';
import Bookings from '../components/Bookings';
import './BookingsPage.css'; 

const BookingsPage = () => {
  return (
    <div className="container">
      <h1>Your Bookings</h1>
      <Bookings />
    </div>
  );
};

export default BookingsPage;
