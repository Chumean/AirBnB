import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import { getSpotDetails, deleteSpot } from "../../store/spots";
import { useModal, ModalProvider } from "../../context/Modal";
import { getAllReviews, removeReview} from "../../store/reviews";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import AddReviewModal from "../AddReviewModal/AddReviewModal";



const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots[spotId]);
    let reviews = useSelector(state => state.reviews);

    // Filters only reviews that matches spot's id
    reviews = useSelector((state) =>
    Object.values(state.reviews).filter((review) => review.spotId === spots.id)
    );

    const {setModalContent} = useModal();

    // Render spot details and its reviews
    useEffect(() => {
        dispatch(getSpotDetails(spotId))
        dispatch(getAllReviews(spotId))
    },[dispatch, spotId])

    // Delete Review modals
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const [showAddReviewModal, setShowAddReviewModal] = useState(false);

    const openAddReviewModal = () => {
        setShowAddReviewModal(true);
    }

    const closeAddReviewModal = () => {
        setShowAddReviewModal(false);
    }

    // Delete a review
    const handleDeleteReview =  async (reviewId, spotId) => {
        console.log("REVIEW ID" , reviewId);
        console.log("SPOT ID", spotId)
        setModalContent(<DeleteReviewModal reviewId={reviewId} spotId={spotId} />);
        // dispatch(removeReview(reviewId))
        openModal();
    }

    // Delete a spot
    const handleDeleteSpot = async(e) => {
        e.preventDefault();
        await dispatch(deleteSpot(spotId));
        await history.push("/");
    };

    const handleAddReviewModal = () => {
        setShowAddReviewModal(true);
    }


    return (
    <ModalProvider>
        <div>
            <h2>DETAILS</h2>
            {spots && (
                <div>
                    <p>{spots.city}, {spots.state}, {spots.country}</p>
                    <img src={spots.previewImage}/>

                    <h2>Hosted By {spots.User?.firstName} {spots.User?.lastName}</h2>
                    <p>{spots.description}</p>
                    <div>${spots.price} night</div>
                    <div>
                        <button>Reserve</button>
                    </div>
                    <div>
                        <h2>Reviews</h2>
                            {Object.values(reviews).map(review => (
                            <div key={review.id}>
                            <p>{review.review}</p>
                            <p>{review.stars} stars</p>

                            <button onClick={() => handleDeleteReview(review.id, spots.id)}>
                            Delete Review
                            </button>

                    </div>
                    ))}
                    <button onClick={handleAddReviewModal}>Add a Review</button>
                    </div>
                    {showAddReviewModal && (
                        <AddReviewModal
                            openAddReviewModal={openAddReviewModal}
                            handleAddReviewModal={handleAddReviewModal}
                            closeAddReviewModal={closeAddReviewModal}
                         />
                    )}

                    <button onClick={handleDeleteSpot}>Remove Listing</button>
                    <Link to={`/spots/${spotId}/edit`} >
                        <button>Update Spot</button>
                    </Link>
                    <button>Post Review</button>
                </div>
            )}
        </div>
    </ModalProvider>
    )

}

export default SpotDetails;
