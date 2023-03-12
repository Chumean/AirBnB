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
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import CreateReview from "../CreateReview/CreateReview";
import "./SpotDetails.css";


const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spots = useSelector(state => {

        return state.spots[spotId]});

    const reviews = useSelector(state => state.reviews);

    const filteredReviews = Object.values(reviews).filter((review) => review?.spotId === spots?.id)

    const sessionUser = useSelector(state => state.session.user);

    const sessionUserId = useSelector(state => state.session.user?.id);

    console.log("REVIEWS", reviews);
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
    const handleDeleteReview =  async (reviewId, spotId, userId) => {
        console.log("sessionUSER", sessionUserId)
        console.log("REVIEW ID USER", reviews.userId)
        setModalContent(<DeleteReviewModal reviewId={reviewId} spotId={spotId} />);
        openModal();
    }

    // Delete a spot
    const handleDeleteSpot = async(e) => {
        e.preventDefault();
        await dispatch(deleteSpot(spotId));
        await history.push("/");
    };

    console.log(reviews)

    // Add Review Modal
    const handleAddReviewModal = () => {
        setShowAddReviewModal(true);
    }

    // Create Review
    const handleAddReviewClick = () => {
        setIsReviewFormVisible(true);
      };


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
                    <div className="reserve-container">


                        {/* <div className="reserve-info">
                         ${spots.price} night
                        <i className="fa-solid fa-star"></i>
                        {spots?.avgRating}
                        ({filteredReviews.length === 1 ? "1 Review" : `${filteredReviews.length} Reviews`})
                        </div> */}
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

                </div>
                    <hr style={{borderWidth: "1px", borderColor: "black"}}/>

                    <div>
                    <h2> <i className="fa-solid fa-star"></i> {filteredReviews.length === 1 ? "Review" : "Reviews"} ({filteredReviews.length === 0 ? "New" : filteredReviews.length})</h2>
                            {filteredReviews && (filteredReviews).map(review => (
                            <div key={review?.id}>
                            <p>{review?.User.firstName}</p>
                            <p>{review?.review}</p>
                            <p>{review?.stars} stars</p>

                            <button
                            className="detail-review-delete"
                             onClick={() => handleDeleteReview(review.id, spots.id)} disabled={!sessionUser}>
                            Delete Review
                            </button>

                    </div>
                    ))}

                    {sessionUser && isReviewFormVisible && (
                        <CreateReview spotId={spotId} />
                        )}

                    <button
                        onClick={handleAddReviewClick}
                        className="add-review-button"
                        disabled={!sessionUser}
                        >
                            Post Your Review
                        </button>
                    </div>


                    {/* <button className="detail-delete-spot-button">
                        <OpenModalMenuItem
                        itemText={'Delete'}
                        modalComponent={<DeleteSpotModal spotId={spotId} />}
                        />
                    </button> */}

                    {/* <Link to={`/spots/${spotId}/edit`} >
                        <button disabled={!sessionUser}>Update Spot</button>
                    </Link> */}

                </div>
            )}
        </div>
    )

}

export default SpotDetails;
