import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useSyncExternalStore } from "react";
import { useHistory } from "react-router-dom";
import { getSpotDetails, deleteSpot } from "../../store/spots";


const SpotDetails = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots[spotId]);



    useEffect(() => {
        dispatch(getSpotDetails(spotId))
    },[dispatch, spotId])

    // const handleEdit = () => {
    //     history.push(`/spots/${spotId}/edit`);
    // }

    const handleDeleteSpot = async(e) => {
        e.preventDefault();
        await dispatch(deleteSpot(spotId));
        history.push("/");
    }


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
                    <button onClick={handleDeleteSpot}>Remove Listing</button>
                </div>
            )}
        </div>
    )




}

export default SpotDetails;
