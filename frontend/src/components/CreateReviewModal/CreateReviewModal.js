import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReview, createReview, getAllReviews } from "../../store/reviews";
import { useSelector } from "react-redux";
import './CreateReviewModal.css';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { Modal } from "../../context/Modal";

const CreateReviewModal = ({ spotId }) => {
    const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user.id);

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReviewInput = {
      spotId: spotId,
      review: review,
      stars: stars,
    };

    let newReview;
    newReview = await dispatch(createReview(newReviewInput));

    if (newReview) {
      await dispatch(addReview(newReview));
      await dispatch(getAllReviews(spotId));
      history.push(`/spots/${spotId}`);
    }
  };

  return (

    <>
      <form onSubmit={handleSubmit} className="add-review-form">
        <label className="review-textarea">
         <div className="how-stay">How was your stay?</div>
          <textarea
            placeholder="Leave your review here.."
            className="textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </label>

        <label className="create-review-stars-input">
          <div className="stars-div">Stars</div>
          <input
            type="number"
            value={stars}
            min={1}
            max={5}
            onChange={(e) => setStars(e.target.value)}
          />
        </label>

        <button
        className="submit-review-button"
        type="submit">Submit Your Review</button>
      </form>
    </>
  );
};

export default CreateReviewModal;
