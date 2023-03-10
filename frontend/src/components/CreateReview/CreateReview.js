import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReview, createReview } from "../../store/reviews";

const CreateReview = ({reviews, spotId}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);

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
                <input
                    type="number"
                    value={stars}
                    min={1}
                    max={5}
                    // step={0.5}
                    onChange={e => setStars(e.target.value)}
                />
            </label>

            <input type="submit" value="Submit Your Review" />

        </form>
    )

}

export default CreateReview;
