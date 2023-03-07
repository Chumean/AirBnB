import React, { useState } from 'react';
import { useModal } from '../../context/Modal';

function ReviewModal({ onSubmit }) {
  const { setModalContent, closeModal } = useModal();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ reviewText, rating });
    closeModal();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Review:
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
        </label>
        <label>
          Rating:
          <input type="number" min="1" max="10" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function MyComponent() {
  const { setModalContent } = useModal();

  const handlePostReviewClick = () => {
    setModalContent(<ReviewModal onSubmit={(review) => console.log(review)} />);
  };

  return (
    <div>
      <button onClick={handlePostReviewClick}>Post Review</button>
    </div>
  );
}

export default ReviewModal;
