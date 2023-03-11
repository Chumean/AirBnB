import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState} from "react";
import { getSpotDetails, deleteSpot } from "../../store/spots";
import { useModal, ModalProvider } from "../../context/Modal";
import { deleteReview, getAllReviews} from "../../store/reviews";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import CreateReview from "../CreateReview/CreateReview";
import "./SpotDetails.css";


const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spots = useSelector(state => {

        return state.spots[spotId]});
    let reviews = useSelector(state => state.reviews);


    // Filters only reviews that matches spot's id
    reviews = useSelector((state) =>
    Object.values(state.reviews).filter((review) => review?.spotId === spots?.id)
    );

    const sessionUser = useSelector(state => state.session.user);

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

    // Delete a spot
    const handleDeleteSpot = async(e) => {
        e.preventDefault();
        await dispatch(deleteSpot(spotId));
        await history.push("/");
    };

    // Add Review Modal
    const handleAddReviewModal = () => {
        setShowAddReviewModal(true);
    }

    // Create Review
    const handleAddReviewClick = () => {
        setIsReviewFormVisible(true);
      };


    return (
    <ModalProvider>
        <div>
            {spots && (
                <div>
                    <h2>{spots.name}</h2>
                    <p className="spot-location">{spots.city}, {spots.state}, {spots.country}</p>
                    <img src={spots.previewImage}/>

                    <h2>Hosted By {spots.User?.firstName} {spots.User?.lastName}</h2>
                    <p>{spots.description}</p>

                    <div>${spots.price} night</div>
                    <div>
                        <button>Reserve</button>
                    </div>
                    <hr style={{borderWidth: "1px", borderColor: "black"}}/>

                    <div>
                        <h2>Reviews</h2>
                            {reviews && Object.values(reviews).map(review => (
                            <div key={review.id}>
                            <p>{review.review}</p>
                            <p>{review.stars} stars</p>

                            <button onClick={() => handleDeleteReview(review.id, spots.id)} disabled={!sessionUser}>
                            Delete Review
                            </button>

                    </div>
                    ))}

                    {isReviewFormVisible && (
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


                    <button
                        onClick={handleDeleteSpot}
                        disabled={!sessionUser}
                        >Remove Listing
                    </button>

                    <Link to={`/spots/${spotId}/edit`} >
                        <button disabled={!sessionUser}>Update Spot</button>
                    </Link>

                </div>
            )}
        </div>
    </ModalProvider>
    )

}

export default SpotDetails;
