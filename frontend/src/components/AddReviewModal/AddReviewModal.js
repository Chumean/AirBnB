import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview, createReview, getAllReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import StarRating from "../StarRating";
import { useHistory } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const AddReviewModal = ({reviews, spotId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState("");

  const handleStarsChange = (value) => {
    setStars(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReviewInput = {
      ...reviews,
      spotId: spotId,
      review: review,
      stars: stars

  }

  let newReview;
  newReview = await dispatch(createReview(newReviewInput));

  // if(newReview) {
      await dispatch(addReview(newReview));
      await dispatch(getAllReviews(spotId))
      history.push(`/spots/${spotId}`);
  };

  // const handleCancel = () => {
  //   closeModal();
  // };

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
          <StarRating value={stars} onChange={handleStarsChange} />
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
          {/* <button type="button" onClick={handleCancel}>
            Cancel
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default AddReviewModal;
