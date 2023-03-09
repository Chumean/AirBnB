import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../store/reviews";

const AddReviewModal = ({ spotId, onClose }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addReview(spotId, review, stars));
    onClose();
  };

  const handleStarChange = (value) => {
    setStars(value);
  };

  return (
    <div>
      <h3>Add Review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div>
          <label>Stars:</label>
          <div>
            <label>
              <input
                type="radio"
                name="stars"
                value="1"
                checked={stars === 1}
                onChange={() => handleStarChange(1)}
              />
              1
            </label>
            <label>
              <input
                type="radio"
                name="stars"
                value="2"
                checked={stars === 2}
                onChange={() => handleStarChange(2)}
              />
              2
            </label>
            <label>
              <input
                type="radio"
                name="stars"
                value="3"
                checked={stars === 3}
                onChange={() => handleStarChange(3)}
              />
              3
            </label>
            <label>
              <input
                type="radio"
                name="stars"
                value="4"
                checked={stars === 4}
                onChange={() => handleStarChange(4)}
              />
              4
            </label>
            <label>
              <input
                type="radio"
                name="stars"
                value="5"
                checked={stars === 5}
                onChange={() => handleStarChange(5)}
              />
              5
            </label>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddReviewModal;
