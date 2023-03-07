import React from "react";
import { Link } from "react-router-dom";


const SpotsIndexItem = ({spot}) => {

    return (
        <li key={`spot-${spot.id}`}>
          <h2>{spot.name}</h2>
          <p>{spot.city}, {spot.state}</p>
          <p>Price: ${spot.price} per night</p>
          <img src={spot.previewImage} alt={`Preview of ${spot.name}`} />
          <div></div>
          <Link to={`/spots/${spot.id}`}>View Spot</Link>
        </li>
      );
}

export default SpotsIndexItem;
