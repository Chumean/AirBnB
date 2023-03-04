import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getSpotDetails } from "../store/spots";
import { getAllSpots } from "../store/spots";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots.spots[spotId]);
    // const owner = useSelector(state => state.spots.spots)
    const ownerFirstName = useSelector(state => state.spots.spots[spotId].User.firstName);
    const ownerLastName = useSelector(state => state.spots.spots[spotId].User.lastName);
    const spotEyeDee = useSelector(state => state.spots.spots[spotId].id)
    // console.log(spotEyeDee)
    // console.log(owner)
    // console.log(spots);
    const imgurl = useSelector(state => state.spots.spots[spotId])
    console.log(imgurl)

    useEffect(() => {
        dispatch(getSpotDetails(spotId))

    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return(
        <div>
            <h2>{spots.name}</h2>
            <p>{spots.city}, {spots.state}, {spots.country}</p>
            <h2>Hosted by {ownerFirstName}, {ownerLastName}</h2>
            <p>Price: ${spots.price} per night</p>
            <p>{spots.description}</p>
            {/* <img key={spotEyeDee} src={spots} */}
        </div>
    )



}

export default SpotDetails;
