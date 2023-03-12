import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";
// import "./AddReviewModal.css";

const AddReviewModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      review,
      stars,
      spotId,
    };
    await dispatch(addReview(payload));
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div className="add-review-modal">
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stars">Stars</label>
          <select
            id="stars"
            name="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          >
            <option value="">-- Select --</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewModal;
