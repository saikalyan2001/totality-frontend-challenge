import React from 'react';

const ReviewList = ({ reviews, renderStars }) => (
  <div className="property-reviews">
    <h3 className="review-title">Reviews</h3>
    {reviews.map((review, index) => (
      <div key={index} className="review">
        <p><strong>{review.username}</strong>:</p>
        <p className="review-stars">{renderStars(review.rating)}</p>
        <p>{review.comment}</p>
      </div>
    ))}
  </div>
);

export default ReviewList;
