import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { getSpotInfo } from "../../store/spots";


const SpotDetails = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spots = useSelector(state => state.spots.spots);
    const selectedSpot = useSelector(state => state.spot[spotId]);

    useEffect(() => {
        dispatch(getSpotInfo(spotId))
    }, [dispatch, spotId])

    return (
        <div>
            <h1>Spot is owned by</h1>
            <ul>
                {Object.values(spots).map(spot => (
                <li key={spot.id}>
                <h2>{spot.name}</h2>
                <p>{spot.description}</p>
                <p>address</p>
                <p>city</p>
                <p>state</p>
                <p>country</p>
                <p>lat</p>
                <p>lng</p>
                <p>Price: ${spot.price} per night</p>
                <img key={spot.id} src={spot.previewImage} />
            </li>
            ))}
            </ul>
        </div>
    )
}

export default SpotDetails;
