import React, { useState, useContext } from 'react';
import { CartContext } from './CartProvider';
import BookingForm from './BookingForm'; 
import './PropertyCard.css';

const PropertyCard = ({ property, onAddToCart }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5); 
  const [error, setError] = useState(null); 
  const [showBookingForm, setShowBookingForm] = useState(false); 
  const { addToFavorites, removeFromFavorites, favorites } = useContext(CartContext);
  const isFavorite = favorites.some(fav => fav.id === property.id);

  const handleFavoriteClick = () => {
    try {
      if (isFavorite) {
        removeFromFavorites(property.id);
      } else {
        addToFavorites(property);
      }
    } catch (err) {
      setError('An error occurred while updating favorites. Please try again.');
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
    setError(null); 
  };

  const toggleBookingForm = () => {
    setShowBookingForm(!showBookingForm);
  };

  const handleSubmitReview = () => {
    if (reviewText.trim()) {
      try {
    
        const newReview = {
          username: 'Current User', 
          rating: rating,
          comment: reviewText,
        };
        
        property.reviews.push(newReview);
        
        setReviewText('');
        setRating(5);
        setError(null); 
        setShowReviewForm(false);
      } catch (err) {
        setError('An error occurred while submitting your review. Please try again.');
      }
    } else {
      setError('Review text cannot be empty.');
    }
  };

  const calculateAverageRating = () => {
    if (property.reviews.length === 0) return 0;
    const totalRating = property.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / property.reviews.length;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="star-rating">
        {Array(fullStars).fill(null).map((_, index) => (
          <span key={`full-${index}`} className="star full">★</span>
        ))}
        {halfStar && <span className="star half">✩</span>}
        {Array(emptyStars).fill(null).map((_, index) => (
          <span key={`empty-${index}`} className="star empty">☆</span>
        ))}
      </div>
    );
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="property-card">
      <div className="property-details-card">
        <img src={property.image} alt={property.title} className="property-image" />
        <div className="property-details">
          <h2 className="property-title">{property.title}</h2>
          <p className="property-description">{property.description}</p>
          <p className="property-price">${property.price} per night</p>
          <p className="property-location">Location: {property.location}</p>
          <p className="property-bedrooms">Bedrooms: {property.bedrooms}</p>
          <p className="property-amenities">
            Amenities: {property.amenities.join(', ')}
          </p>
          <div className="property-buttons">
            <button className="add-to-cart-btn" onClick={() => onAddToCart(property)}>
              Add to Cart
            </button>
            <button className="book-now-btn" onClick={toggleBookingForm}>
              Book Now
            </button>
            <button className="favorite-btn" onClick={handleFavoriteClick}>
              <span className="material-icons fav-icon">
                {isFavorite ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>
          {showBookingForm && <BookingForm property={property} onClose={toggleBookingForm} />}
        </div>
      </div>

      <div className="rating-card">
        <h3>Average Rating</h3>
        {renderStars(averageRating)}
      </div>

      <div className="reviews-card">
        <div className="review-toggle" onClick={toggleReviews}>
          {showReviews ? (
            <>
              <span className="arrow-up">&#9650;</span> Hide Reviews
            </>
          ) : (
            <>
              <span className="arrow-down">&#9660;</span> Show Reviews
            </>
          )}
        </div>
        {error && <p className="error-message">{error}</p>}
        {showReviews && (
          <div className="property-reviews">
            <h3 className='review-title'>Reviews</h3>
            {property.reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.username}</strong>:</p>
                <p className="review-stars">{renderStars(review.rating)}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        {!showReviewForm ? (
          <div className="add-review-section">
            <button className="add-review-btn" onClick={toggleReviewForm}>
              Add Review
            </button>
          </div>
        ) : (
          <div className="review-form">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
            />
            <select className='rating-selector' value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
              ))}
            </select>
            <button className="submit-review-btn" onClick={handleSubmitReview}>
              Submit Review
            </button>
            <button className="cancel-review-btn" onClick={toggleReviewForm}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
