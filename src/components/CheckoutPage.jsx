import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { CartContext } from './CartProvider';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, setCart, addBookingToCart } = useContext(CartContext);
  const { user, isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [totalCost, setTotalCost] = useState(0); 
  const [formDetails, setFormDetails] = useState(
    cart.reduce((acc, item, index) => ({
      ...acc,
      [`${item.id}-${index}`]: {
        checkInDate: item.checkInDate || '',
        checkOutDate: item.checkOutDate || '',
        name: '',
        email: ''
      }
    }), {})
  );
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  // Function to calculate total cost based on the cart state
  const calculateTotalCost = () => {
    const total = cart.reduce(
      (total, item) => 
        total + (item.price * (item.quantity || 1) * (item.numberOfNights || 1)), 
      0
    ).toFixed(2);
    setTotalCost(total); 
  };

  // Use useEffect to recalculate total cost whenever the cart changes
  useEffect(() => {
    calculateTotalCost();
  }, [cart]); 

  const handleChange = (itemId, index, field, value) => {
    setFormDetails(prevDetails => ({
      ...prevDetails,
      [`${itemId}-${index}`]: {
        ...prevDetails[`${itemId}-${index}`],
        [field]: value
      }
    }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      [field]: value
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      alert('Checkout process completed. Thank you for your booking!');
  
      if (user && isAuthenticated) {
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: [] }); 
        setCart([]); 
  
        cart.forEach((item, index) => {
          const bookingDetails = {
            propertyTitle: item.title,
            bookedDate: new Date().toISOString(),
            checkInDate: formDetails[`${item.id}-${index}`]?.checkInDate || '',
            checkOutDate: formDetails[`${item.id}-${index}`]?.checkOutDate || '',
            name: formDetails[`${item.id}-${index}`]?.name || '',
            email: formDetails[`${item.id}-${index}`]?.email || '',
          };
          addBookingToCart(bookingDetails);
        });
  
      
        setPaymentDetails({
          cardNumber: '',
          expiryMonth: '',
          expiryYear: '',
          cvv: ''
        });
      }
    } catch (err) {
      setError('An error occurred while processing your checkout. Please try again later.');
      console.error('Checkout error:', err);
    }
  };

  return (
    <div className="checkout-page">
      <h2 className='checkout-title'>Checkout</h2>
      <div className="checkout-summary">
        <h3>Total Cost: ${totalCost}</h3> {}
      </div>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleCheckout} className='checkout-details'>
        <fieldset>
          <legend>Booking Details</legend>
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="booking-item">
              <h4>{item.title}</h4>
              <label>
                Check-In Date:
                <input
                  type="date"
                  value={formDetails[`${item.id}-${index}`]?.checkInDate || ''}
                  onChange={(e) => handleChange(item.id, index, 'checkInDate', e.target.value)}
                  required
                />
              </label>
              <label>
                Check-Out Date:
                <input
                  type="date"
                  value={formDetails[`${item.id}-${index}`]?.checkOutDate || ''}
                  onChange={(e) => handleChange(item.id, index, 'checkOutDate', e.target.value)}
                  required
                />
              </label>
              <label>
                Name:
                <input
                  type="text"
                  value={formDetails[`${item.id}-${index}`]?.name || ''}
                  onChange={(e) => handleChange(item.id, index, 'name', e.target.value)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={formDetails[`${item.id}-${index}`]?.email || ''}
                  onChange={(e) => handleChange(item.id, index, 'email', e.target.value)}
                  required
                />
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset>
          <legend>Payment Details</legend>
          <label>
            Card Number:
            <input
              type="number"
              value={paymentDetails.cardNumber || ''}
              onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
              required
            />
          </label>
          <label>
            Expiry Date:
            <input
              type="date"
              maxLength="4"
              value={paymentDetails.expiryYear || ''}
              onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              value={paymentDetails.cvv || ''}
              onChange={(e) => handlePaymentChange('cvv', e.target.value)}
              required
            />
          </label>
        </fieldset>
        <button type="submit">Complete Booking</button>
      </form>
      <button className='goback-btn' onClick={() => navigate('/cart')} style={{ marginTop: '20px' }}>Go Back</button>
    </div>
  );
};

export default CheckoutPage;
