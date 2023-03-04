import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getSpotDetails } from "../store/spots";
import { getAllSpots } from "../store/spots";

const SpotDetails = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();
    const spots = useSelector(state => state.spots);


    useEffect(() => {
        dispatch(getSpotDetails(spotId))

    }, [dispatch, spotId])

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    return(
        <div>
            <h2>TEST</h2>
        </div>
    )



}

export default SpotDetails;
