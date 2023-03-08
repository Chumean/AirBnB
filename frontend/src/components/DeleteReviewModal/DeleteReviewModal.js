import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpotDetails } from "../../store/spots";
import { removeReview } from "../../store/reviews";
import { useModal } from "../../context/Modal";

const DeleteReviewModal = ({reviewId, spotId}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {closeModal} = useModal();

    const deleteReview = async (e) => {
        e.preventDefault();
        await dispatch(removeReview(reviewId));
        await dispatch(getSpotDetails(spotId));
        closeModal();
    }

    return (
        <div>
           <h2>Delete Review Confirmation</h2>
           <label>Are you sure you want to delete this review?</label>
           <button onClick={deleteReview}>Yes(Delete Review)</button>
           <button onClick={closeModal}>No(Keep Review)</button>
        </div>
    )
}

export default DeleteReviewModal;
