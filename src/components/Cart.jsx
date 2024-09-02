import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartProvider';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import './Cart.css';

const saveCart = async (cart, userId) => {
  try {
    if (userId) {
      const cartRef = doc(db, 'carts', userId);
      await setDoc(cartRef, { items: cart }, { merge: true });
      console.log('Cart saved successfully!');
    } else {
      console.error('User ID is not available. Cannot save cart.');
    }
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
};

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, setCart } = useContext(CartContext);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Save cart whenever it changes
  useEffect(() => {
    if (isAuthenticated && cart.length > 0) {
      saveCart(cart, user.uid);
    }
  }, [cart, user, isAuthenticated]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user && isAuthenticated) {
          const cartRef = doc(db, 'carts', user.uid);
          const cartSnap = await getDoc(cartRef);

          if (cartSnap.exists()) {
            const items = cartSnap.data().items || [];
            const updatedItems = items.map(item => ({
              ...item,
              quantity: item.quantity || 1,
              numberOfNights: item.numberOfNights || 1, // Ensure this property exists
            }));
            setCart(updatedItems);
          } else {
            console.log('No cart data found');
            setCart([]);
          }
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setError('Failed to fetch cart. Please try again later.');
      }
    };

    fetchCart();
  }, [user, isAuthenticated, setCart]);

  const handleIncreaseQuantity = (id) => {
    try {
      const item = cart.find(item => item.id === id);
      if (item) {
        updateQuantity(id, (item.quantity || 1) + 1);
      }
    } catch (err) {
      console.error('Failed to increase quantity:', err);
      setError('Failed to update quantity. Please try again later.');
    }
  };

  const handleDecreaseQuantity = (id) => {
    try {
      const item = cart.find(item => item.id === id);
      if (item && (item.quantity || 1) > 1) {
        updateQuantity(id, (item.quantity || 1) - 1);
      }
    } catch (err) {
      console.error('Failed to decrease quantity:', err);
      setError('Failed to update quantity. Please try again later.');
    }
  };

  const handleNumberOfNightsChange = (id, nights) => {
    const parsedNights = parseInt(nights, 10);
    if (parsedNights >= 1) {
      setCart(prevCart => 
        prevCart.map(item =>
          item.id === id ? { ...item, numberOfNights: parsedNights } : item
        )
      );
    }
  };

  const calculateTotalCost = () => {
    return cart.reduce((total, item) => 
      total + (item.price * (item.quantity || 1) * (item.numberOfNights || 1)), 0
    ).toFixed(2);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {error && <p className="error-message">{error}</p>}

<table className="cart-table">
  <thead>
    <tr>
      <th>Property</th>
      <th>Price per Night</th>
      <th>Quantity</th>
      <th>Number of Nights</th>
      <th>Total</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {cart.length > 0 ? (
      cart.map(item => (
        <tr key={item.id}>
          <td>{item.title}</td> 
          <td>${item.price.toFixed(2)}</td>
          <td>
            <div className="quantity-controls">
              <button className="decrement-btn" onClick={() => handleDecreaseQuantity(item.id)}>
                <span className="material-icons dec-icon">remove</span>
              </button>
              <span className="quantity-value">{item.quantity || 1}</span>
              <button className="increment-btn" onClick={() => handleIncreaseQuantity(item.id)}>
                <span className="material-icons inc-icon">add</span>
              </button>
            </div>
          </td>
          <td>
            <input 
              type="number" 
              min="1" 
              value={item.numberOfNights || 1} 
              onChange={(e) => handleNumberOfNightsChange(item.id, e.target.value)} 
              className="nights-input"
            />
          </td>
          <td>${(item.price * (item.quantity || 1) * (item.numberOfNights || 1)).toFixed(2)}</td>
          <td>
            <button className='cart-remove-btn' onClick={() => removeFromCart(item.id)}>Remove</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6">Your cart is empty</td>
      </tr>
    )}
  </tbody>
</table>

<table className="mobile-view-table">
  <thead>
  </thead>
  <tbody>
    {cart.length > 0 ? (
      cart.map(item => (
        <tr key={item.id}>
          <td data-label="Property">{item.title}</td>
          <td data-label="Price">${item.price.toFixed(2)}</td>
          <td data-label="Quantity">
            <div className="quantity-controls">
              <button className="decrement-btn" onClick={() => handleDecreaseQuantity(item.id)}>
                <span className="material-icons dec-icon">remove</span>
              </button>
              <span className="quantity-value">{item.quantity || 1}</span>
              <button className="increment-btn" onClick={() => handleIncreaseQuantity(item.id)}>
                <span className="material-icons inc-icon">add</span>
              </button>
            </div>
          </td>
          <td data-label="Number of Nights"> 
            <input 
              type="number" 
              min="1" 
              value={item.numberOfNights || 1} 
              onChange={(e) => handleNumberOfNightsChange(item.id, e.target.value)} 
              className="nights-input"
            />
          </td>
          <td data-label="Total">${(item.price * (item.quantity || 1) * (item.numberOfNights || 1)).toFixed(2)}</td>
          <td data-label="Action">
            <button className='cart-remove-btn' onClick={() => removeFromCart(item.id)}>Remove</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6">Your cart is empty</td>
      </tr>
    )}
  </tbody>
</table>


      
      <div className="cart-summary">
        <h2>Total Cost: ${calculateTotalCost()}</h2>
      </div>
      <button className="checkout-btn" onClick={() => navigate('/checkout')}>Go to Checkout</button>
    </div>
  );
};

export default CartPage;
