import React from "react";
import { Link } from "react-router-dom";
import "./SpotsIndex/SpotsIndex.css";

const SpotsIndexItem = ({spot}) => {

    return (
        <li key={`spot-${spot.id}`} className="spot-card">
          <Link to={`/spots/${spot.id}`}>
            <div className="spot-image-wrapper"
             style={{
              backgroundImage: `url(${spot.previewImage})`,
              cursor: "pointer",
              borderRadius: "12px",

            }}
            title={spot.name}
              ></div>
          </Link>
          {/* <h2>{spot.name}</h2> */}
          <p>{spot.city}, {spot.state}</p>
          <p>${spot.price} night</p>
          {/* <img src={spot.previewImage} alt={`Preview of ${spot.name}`} className="spot-image"/> */}
          <div></div>

        </li>
      );
}

export default SpotsIndexItem;
