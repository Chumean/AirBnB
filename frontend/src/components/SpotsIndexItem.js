import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeSpot } from "../store/spots";

const SpotsIndexItem = ({spot}) => {
    const dispatch = useDispatch();


    const deleteSpot = (e) => {
        e.preventDefault();
        dispatch(removeSpot(spot.id))
    }

    return (
        <li key={spot.id}>
          <h2>{spot.name}</h2>
          <p>{spot.city}, {spot.state}</p>
          <p>Price: ${spot.price} per night</p>
          <img src={spot.previewImage} alt={`Preview of ${spot.name}`} />
        </li>
      );
}

export default SpotsIndexItem;
