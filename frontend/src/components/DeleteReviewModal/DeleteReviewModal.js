import { useDispatch } from "react-redux";
import { getSpotDetails } from "../../store/spots";
import { deleteReview, getAllReviews } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import './DeleteReviewModal.css';

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
    }

    return (
        <div className="delete-modal-container">
           <h2 className="confirm-delete-review">Delete Review Confirmation</h2>
           <p className="confirm-delete-review-msg">Are you sure you want to delete this review?</p>
           <div className="delete-review-buttons">
           <button className="yes-delete-review" onClick={removeReview}>Yes(Delete Review)</button>
           <button className="no-delete-review" onClick={closeModal}>No(Keep Review)</button>
           </div>
        </div>
    )
}

export default DeleteReviewModal;
