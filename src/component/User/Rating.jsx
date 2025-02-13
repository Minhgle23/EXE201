import React, { useState } from 'react';


const Rating = ({ rating, onRatingChange, editable }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating">
      {stars.map((star) => (
        <span
          key={star}
          className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
          onClick={() => editable && onRatingChange(star)}
          onMouseEnter={() => editable && setHoverRating(star)}
          onMouseLeave={() => editable && setHoverRating(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;