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

          {/* <span className="spot-info">{spot.city}, {spot.state} <i className="fa-solid fa-star"> {spot?.avgRating}</i>

          </span> */}
          <span className="spot-info">{spot.city}, {spot.state} {spot?.avgRating && <i className="fa-solid fa-star"> {spot.avgRating.toFixed(1)}</i>}

          </span>
          <p>${spot.price} night</p>

        </li>
      );
}

export default SpotsIndexItem;
