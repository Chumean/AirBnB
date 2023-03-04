import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useSyncExternalStore } from "react";
import { useHistory } from "react-router-dom";
import { getSpotDetails } from "../store/spots";
// import { getAllSpots } from "../store/spots";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots[spotId]);

    console.log(spots);

    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    },[dispatch, spotId])


    return (
        <div>
            <h2>DETAILS</h2>
            {spots && (
                <div>
                    <p>{spots.city}, {spots.state}, {spots.country}</p>
                    <img src={spots.previewImage}/>

                    <h2>Hosted By {spots.User.firstName} {spots.User.lastName}</h2>
                    <p>{spots.description}</p>
                    <div>${spots.price} night</div>
                    <h2>Reviews</h2>
                </div>
            )}
        </div>
    )




}

export default SpotDetails;
