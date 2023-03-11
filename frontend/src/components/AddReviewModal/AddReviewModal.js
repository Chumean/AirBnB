import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview, createReview } from "../../store/reviews";
import StarRating from "../StarRating";
import { useSelector } from "react-redux";

const CreateReviewModal = ({ spotId, onClose }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user.id);

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReviewInput = {
            spotId: spotId,
            review: review,
            stars: stars
        };

        const newReview = await dispatch(createReview(newReviewInput));

        if (newReview) {
            dispatch(addReview(newReview));
            onClose();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Submit Your Review</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Review
                        <input
                            type="textarea"
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                    </label>

                    <label>
                        Stars
                        <StarRating key={spotId} setStars={setStars} />
                    </label>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateReviewModal;
