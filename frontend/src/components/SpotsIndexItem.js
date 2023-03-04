import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeSpot } from "../store/spots";

const SpotsIndexItem = (spot) => {
    const dispatch = useDispatch();

    const deleteSpot = (e) => {
        e.preventDefault();
        dispatch(removeSpot(spot.id))
    }

    return (
        <li>
            <Link to={`/spots/${spot.id}`}>SPOT HERE</Link>
        </li>
    )
}

export default SpotsIndexItem;
