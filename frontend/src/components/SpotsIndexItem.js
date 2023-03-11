import React from "react";
import { Link } from "react-router-dom";
import "./SpotsIndex/SpotsIndex.css";
import { useSelector } from "react-redux";


const SpotsIndexItem = ({spot}) => {
  console.log("SPOTS")
  console.log(spot)
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

          <div>
          <p className="spot-avgRating">{spot.avgRating}</p>

          </div>

        </li>
      );
}

export default SpotsIndexItem;
