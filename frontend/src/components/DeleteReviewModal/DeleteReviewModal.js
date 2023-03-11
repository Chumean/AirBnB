import { useDispatch } from "react-redux";
import { getSpotDetails } from "../../store/spots";
import { deleteReview, getAllReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const DeleteReviewModal = ({reviewId, spotId}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {closeModal} = useModal();

    const removeReview = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewId));
        await dispatch(getSpotDetails(spotId));
        await dispatch(getAllReviews(spotId))

        closeModal();
        // history.push(`/spots/${spotId}`)
    }

    return (
        <div>
           <h2>Delete Review Confirmation</h2>
           <label>Are you sure you want to delete this review?</label>
           <button onClick={removeReview}>Yes(Delete Review)</button>
           <button onClick={closeModal}>No(Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal;
