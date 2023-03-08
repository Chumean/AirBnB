import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpotDetails, deleteSpot } from "../../store/spots";
import { useModal, ModalProvider } from "../../context/Modal";
import ReviewModal from "../ReviewModal/ReviewModal";
import { createReview, getAllReviews } from "../../store/reviews";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots[spotId]);


    const reviews = useSelector(state => state.reviews);
    

    // function objKeys(obj) {
    //     for (const prop in obj["1"]) {
    //       console.log(prop);
    //     }
    //   }

    //   objKeys(reviews);

    //   function logReviewInfo(review) {
    //     console.log(" REVIEW SPOT ID", review.spotId)
    //   }

    //   const review = reviews["1"];
    //   logReviewInfo(review);


    console.log(reviews)

    const {setModalContent} = useModal();

    useEffect(() => {
        console.log("SPOT ID", spotId)
        dispatch(getSpotDetails(spotId))
        dispatch(getAllReviews(spotId))
    },[dispatch, spotId])


    const handleDeleteSpot = async(e) => {
        e.preventDefault();
        await dispatch(deleteSpot(spotId));
        history.push("/");
    }

    const handlePostReview = () => {
        setModalContent(<ReviewModal onSubmit={async (review) => {
          const data = await dispatch(createReview(review));
          if (data) {
            dispatch(getAllReviews(spotId));
          }
        }} />);
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
                        <h2>Reviews</h2>
                            {Object.values(reviews).map(review => (
                            <div key={review.id}>
                            <p>{review.review}</p>
                            <p>{review.stars} stars</p>

                    </div>
                    ))}
                    </div>


                    <button onClick={handleDeleteSpot}>Remove Listing</button>
                    <Link to={`/spots/${spotId}/edit`} >
                        <button>Update Spot</button>
                    </Link>
                    <button onClick={handlePostReview}>Post Review</button>
                </div>
            )}
        </div>
    </ModalProvider>
    )

}

export default SpotDetails;
