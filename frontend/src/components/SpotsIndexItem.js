import React from "react";
import { Link } from "react-router-dom";
import "./SpotsIndex/SpotsIndex.css";
import { useSelector } from "react-redux";


const SpotsIndexItem = ({spot, previewImage}) => {

    return (
        <li key={`spot-${spot.id}`} className="spot-card">
          <Link to={`/spots/${spot.id}`}>
            <div className="spot-image-wrapper"
             style={{
              backgroundImage: `url(${previewImage})`, // changed spot.previewImage to previewImage
              cursor: "pointer",
              borderRadius: "12px",

            }}
            title={spot.name}
              ></div>
          </Link>

          <p>{spot.city}, {spot.state}</p>
          <p>${spot.price} night</p>

          <div>

          <p className="spot-avgRating">{spot.avgRating}</p>

          </div>

        </li>
      );
}

export default SpotsIndexItem;
