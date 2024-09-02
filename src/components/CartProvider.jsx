import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { user, isAuthenticated } = useAuth();

  const fetchData = async () => {
    if (user && isAuthenticated) {
      try {
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
        setCart(cartSnap.exists() ? cartSnap.data().items || [] : []);

        const favoritesRef = doc(db, 'favorites', user.uid);
        const favoritesSnap = await getDoc(favoritesRef);
        setFavorites(favoritesSnap.exists() ? favoritesSnap.data().items || [] : []);

        const bookingsRef = doc(db, 'bookings', user.uid);
        const bookingsSnap = await getDoc(bookingsRef);
        setBookings(bookingsSnap.exists() ? bookingsSnap.data().items || [] : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, isAuthenticated]);

  const generateUniqueId = () => Date.now().toString();

  const updateFirestoreDocument = async (collection, data) => {
    if (user && isAuthenticated) {
      try {
        const docRef = doc(db, collection, user.uid);
        await setDoc(docRef, { items: data });
      } catch (error) {
        console.error(`Error updating ${collection}:`, error);
      }
    }
  };

  const addToCart = async (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      const updatedCart = existingItem
        ? prevCart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: (cartItem.quantity || 1) + (item.quantity || 1) }
              : cartItem
          )
        : [...prevCart, { ...item, quantity: item.quantity || 1 }];
        
      updateFirestoreDocument('carts', updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = async (id) => {
    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item.id !== id);
      updateFirestoreDocument('carts', updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = async (id, quantity) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      updateFirestoreDocument('carts', updatedCart);
      return updatedCart;
    });
  };

  const addToFavorites = async (item) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.find(fav => fav.id === item.id)
        ? prevFavorites
        : [...prevFavorites, item];
      updateFirestoreDocument('favorites', updatedFavorites);
      return updatedFavorites;
    });
  };

  const removeFromFavorites = async (id) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = prevFavorites.filter(item => item.id !== id);
      updateFirestoreDocument('favorites', updatedFavorites);
      return updatedFavorites;
    });
  };

  const addBookingToCart = async (bookingDetails) => {
    const bookingWithId = { ...bookingDetails, id: bookingDetails.id || generateUniqueId() };
    setBookings(prevBookings => {
      const updatedBookings = [...prevBookings, bookingWithId];
      updateFirestoreDocument('bookings', updatedBookings);
      return updatedBookings;
    });
  };

  const removeBookingFromCart = async (id) => {
    setBookings(prevBookings => {
      const updatedBookings = prevBookings.filter(item => item.id !== id);
      updateFirestoreDocument('bookings', updatedBookings);
      return updatedBookings;
    });
  };

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      favorites,
      addToFavorites,
      removeFromFavorites,
      bookings,
      addBookingToCart,
      removeBookingFromCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
