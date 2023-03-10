import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReview, createReview } from "../../store/reviews";
import StarRating from "../StarRating";
import { useSelector } from "react-redux";

const CreateReview = ({reviews, spotId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user.id);


    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [error, setError] = useState('');

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

        if(newReview) {
            dispatch(addReview(newReview));
            // history.push(`/spots/${spotId}`);
        }

    };

    return (
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
                {/* <StarRating key={spotId} setStars={setStars} /> */}
                <input
                    type="number"
                    value={stars}
                    min={1}
                    max={5}
                    onChange={e => setStars(e.target.value)}
                />

            </label>

            <input type="submit" value="Submit Your Review" />

        </form>
    )

}

export default CreateReview;
