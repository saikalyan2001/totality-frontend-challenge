import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../components/CartProvider';
import PropertyCard from '../components/PropertyCard';
import './FavoritesPage.css';

function FavoritesPage() {
  const { favorites, addToCart, removeFromFavorites } = useContext(CartContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!favorites) {
      setError('Favorites data is not available.');
    }
  }, [favorites]);

  const handleAddToCart = (property) => {
    try {
      addToCart(property);
    } catch (err) {
      setError('Failed to add property to cart.');
    }
  };

  const handleRemoveFromFavorites = (property) => {
    try {
      removeFromFavorites(property);
    } catch (err) {
      setError('Failed to remove property from favorites.');
    }
  };

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1 className='fav-title'>Favorite Properties</h1>
      <div className="property-cards">
        {favorites.length > 0 ? (
          favorites.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onAddToCart={() => handleAddToCart(property)}
              onBookingClick={() => {}}
            />
          ))
        ) : (
          <p>No favorite properties found.</p>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
