import React, { useContext, useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { CartContext } from './CartProvider';
import FilterBar from './FilterBar';
import BookingForm from './BookingForm';
import './PropertyList.css';
import propertiesData from '../assets/properties.json';

function PropertyList() {
  const { addToCart } = useContext(CartContext);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setFilteredProperties(propertiesData);
    } catch (e) {
      console.error("Failed to load properties data:", e);
      setError("Failed to load properties. Please try again later.");
    }
  }, []);

  const handleFilterChange = (filters) => {
    try {
      const { location, priceRange, bedrooms, amenities } = filters;
      let filtered = propertiesData;

      if (location) {
        filtered = filtered.filter(property => property.location.toLowerCase().includes(location.toLowerCase()));
      }

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        if (isNaN(minPrice) || isNaN(maxPrice)) {
          throw new Error("Invalid price range");
        }
        filtered = filtered.filter(property => property.price >= minPrice && property.price <= maxPrice);
      }

      if (bedrooms) {
        filtered = filtered.filter(property => property.bedrooms === bedrooms);
      }

      if (amenities.length > 0) {
        filtered = filtered.filter(property => amenities.every(amenity => property.amenities.includes(amenity)));
      }

      setFilteredProperties(filtered);
    } catch (e) {
      console.error("Failed to filter properties:", e);
      setError("An error occurred while filtering properties. Please try again.");
    }
  };

  const handleBookingClick = (property) => {
    try {
      setSelectedProperty(property);
    } catch (e) {
      console.error("Failed to select property for booking:", e);
      setError("An error occurred while selecting the property for booking. Please try again.");
    }
  };

  const handleBookingClose = () => {
    try {
      setSelectedProperty(null);
    } catch (e) {
      console.error("Failed to close booking form:", e);
      setError("An error occurred while closing the booking form. Please try again.");
    }
  };

  return (
    <div className="property-list">
      <h1 className='main-title'>Available Properties</h1>
      {error && <p className="error-message">{error}</p>}
      <FilterBar  className="filter-bar-btn" onFilterChange={handleFilterChange} />
      <div className='main-card'>
      <div className="property-cards">
        {filteredProperties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onAddToCart={() => {
              try {
                addToCart(property);
              } catch (e) {
                console.error("Failed to add property to cart:", e);
                setError("An error occurred while adding the property to the cart. Please try again.");
              }
            }}
            onBookingClick={() => handleBookingClick(property)}
          />
        ))}
      </div>
      {selectedProperty && (
        <BookingForm 
          property={selectedProperty}
          onClose={handleBookingClose}
        />
      )}
    </div>
    </div>
  );
}

export default PropertyList;
