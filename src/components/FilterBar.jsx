import React, { useState } from 'react';
import './FilterBar.css'; 

const FilterBar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [error, setError] = useState(''); 

  const handleLocationChange = (e) => setLocation(e.target.value);

  const handlePriceRangeChange = (e) => setPriceRange(e.target.value);

  const handleBedroomsChange = (e) => {
    const value = e.target.value;

   
    if (isNaN(value) || value < 0) {
      setError('Number of bedrooms must be a non-negative integer.');
    } else {
      setError('');
      setBedrooms(value);
    }
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAmenities((prevAmenities) => [...prevAmenities, value]);
    } else {
      setAmenities((prevAmenities) =>
        prevAmenities.filter((amenity) => amenity !== value)
      );
    }
  };

  const applyFilters = () => {

    if (isNaN(bedrooms) || bedrooms < 0) {
      setError('Number of bedrooms must be a non-negative integer.');
      return;
    }

    setError(''); 
    onFilterChange({
      location,
      priceRange,
      bedrooms: parseInt(bedrooms, 10),
      amenities,
    });
    setIsOpen(false); 
  };

  const clearFilters = () => {
    setLocation('');
    setPriceRange('');
    setBedrooms('');
    setAmenities([]);
    setError(''); 
    onFilterChange({
      location: '',
      priceRange: '',
      bedrooms: '',
      amenities: [],
    }); 
  };

  const toggleFilterBar = () => setIsOpen(!isOpen); 

  return (
    <div className="filter-container">
      {}
      {!isOpen && (
        <button className="toggle-filter-btn" onClick={toggleFilterBar}>
          Filter
        </button>
      )}

      <div className={`filter-bar ${isOpen ? 'open' : 'closed'}`}>
        <div className="filter-bar-header">
          <span className="close-icon" onClick={toggleFilterBar}>
            &times;
          </span>
        </div>

        {error && <div className="error-message">{error}</div>} {}

        <div className="filter-group">
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter location"
          />
        </div>

        <div className="filter-group">
          <label>Price Range:</label>
          <select value={priceRange} onChange={handlePriceRangeChange}>
            <option value="">Select</option>
            <option value="0-100">$0 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201-300">$201 - $300</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Bedrooms:</label>
          <input
            type="number"
            value={bedrooms}
            onChange={handleBedroomsChange}
            min="0" 
            placeholder="Number of bedrooms"
          />
        </div>

        <div className="filter-group">
          <label>Amenities:</label>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                value="Pool"
                checked={amenities.includes('Pool')}
                onChange={handleAmenitiesChange}
              />
              Pool
            </label>
            <label>
              <input
                type="checkbox"
                value="WiFi"
                checked={amenities.includes('WiFi')}
                onChange={handleAmenitiesChange}
              />
              WiFi
            </label>
            <label>
              <input
                type="checkbox"
                value="Hot Tub"
                checked={amenities.includes('Hot Tub')}
                onChange={handleAmenitiesChange}
              />
              Hot Tub
            </label>
            <label>
              <input
                type="checkbox"
                value="Hiking"
                checked={amenities.includes('Hiking')}
                onChange={handleAmenitiesChange}
              />
              Hiking
            </label>
          </div>
        </div>

        <div className="filter-bar-actions">
          <button className="apply-filters-btn" onClick={applyFilters}>
            Apply Filters
          </button>
          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
