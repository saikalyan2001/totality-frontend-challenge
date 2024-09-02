import React, { useState } from 'react';

const ReviewForm = ({ onSubmitReview, onCancel }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (reviewText.trim()) {
      onSubmitReview({ text: reviewText, rating });
      setReviewText('');
      setRating(5);
      setError(null);
    } else {
      setError('Review text cannot be empty.');
    }
  };

  return (
    <div className="review-form">
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here..."
      />
      <select
        className="rating-selector"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map(num => (
          <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
        ))}
      </select>
      <button className="submit-review-btn" onClick={handleSubmit}>
        Submit Review
      </button>
      <button className="cancel-review-btn" onClick={onCancel}>
        Cancel
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ReviewForm;
