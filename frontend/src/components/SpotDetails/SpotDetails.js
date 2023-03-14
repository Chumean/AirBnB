import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import { getSpotDetails, deleteSpot } from "../../store/spots";
import { useModal } from "../../context/Modal";
import { getAllReviews} from "../../store/reviews";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import DeleteSpotModal from "../DeleteSpotModal/DeleteSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import CreateReview from "../CreateReview/CreateReview";
import CreateReviewModal from "../CreateReviewModal/CreateReviewModal";
import "./SpotDetails.css";


const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots[spotId]);

    const reviews = useSelector(state => state.reviews);

    const filteredReviews = Object.values(reviews).filter((review) => review?.spotId === spots?.id)

    const sessionUser = useSelector(state => state.session.user);

    const sessionUserId = useSelector(state => state.session.user?.id);

    // Searches if the spot belongs to the owner
    const isCurrentUserHost = spots?.ownerId === sessionUserId;

    const hasUserReviewed = filteredReviews.some((review) => review.userId === sessionUserId);

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

    // Add Review Modal useState
    const [showAddReviewModal, setShowAddReviewModal] = useState(false);

    // Create Review Modal useState
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);


    // Delete a review
    const handleDeleteReview =  async (reviewId, spotId) => {
        setModalContent(<DeleteReviewModal reviewId={reviewId} spotId={spotId} />);
        openModal();
    }


    // Add Review Modal
   const handleAddReviewModal = async () => {

    setModalContent(<CreateReviewModal spotId={spotId} />)
    openModal();
   }


    return (

        <div>
            {spots && (
                <div>
                    <h2 className="detail-spot-name">{spots.name}</h2>
                    <p className="spot-location">{spots.city}, {spots.state}, {spots.country}</p>
                    <img src={spots.previewImage}/>

                    <h2 className="detail-host">Hosted By {spots.User?.firstName} {spots.User?.lastName}</h2>
                    <p>{spots.description}</p>

                    <div className="reserve-container-wrapper">
                    </div>
                        <div className="reserve-container">

                        <div className="reserve-info">
                        ${spots.price} night
                        {spots?.avgRating && (
                            <>
                            <i className="fa-solid fa-star"></i>
                            <span>{spots.avgRating.toFixed(1)}</span>
                            </>
                                )}
                            ({filteredReviews.length === 1 ? "1 Review" : `${filteredReviews.length} Reviews`})
                        </div>

                        <div>
                            <button className="reserve-button">Reserve</button>
                        </div>
                    </div>


                    <hr style={{borderWidth: "1px", borderColor: "black"}}/>

                    <div>
                        <h2> <i className="fa-solid fa-star"></i> {filteredReviews.length === 1 ? "Review" : "Reviews"} ({filteredReviews.length === 0 ? "New" : filteredReviews.length})</h2>
                            {filteredReviews && (filteredReviews).map(review => (
                            <div key={review?.id}>
                            {/* <p>{review?.User.firstName}</p> */}
                            <p>{review?.review}</p>
                            <p>{review?.stars} stars</p>

                            <button
                            className="detail-review-delete"
                             onClick={() => handleDeleteReview(review.id, spots.id)} disabled={!sessionUser}>
                            Delete Review
                            </button>

                        </div>
                        ))}

                        {/* {sessionUser && (
                        <CreateReview spotId={spotId} />
                        )}

                        <button
                            onClick={handleAddReviewClick}
                            className="add-review-button"
                            disabled={!sessionUser || isCurrentUserHost}
                            >
                            Post Your Review
                        </button> */}

                        {/* {sessionUser && spotId && (
                            <CreateReviewModal spotId={spotId} />
                        )} */}
                        <button
                        onClick={handleAddReviewModal}
                        className="add-review-modal-button"
                        disabled={!sessionUser || hasUserReviewed || isCurrentUserHost}

                        >Post Your Review</button>
                    </div>



                </div>
            )}
        </div>
    )

}

export default SpotDetails;
