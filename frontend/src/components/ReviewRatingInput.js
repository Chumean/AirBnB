import { useState } from "react";
const ReviewRatingInput = ({rating, disabled, onChange}) => {
    const [activeRating, setActiveRating] = useState(rating);

    const handleMouseEnter = (index) => {
        setActiveRating(index);
    };

    const handleMouseLeave = () => {
        setActiveRating(rating);
    }

    return (
        <div className="review-rating-input">
          <div className="rating-input">
            <div
              className={activeRating >= 1 ? "filled" : "empty"}
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onChange(1)}
              disabled={disabled}
            >
              <i className="fa fa-star"></i>
            </div>
            <div
              className={activeRating >= 2 ? "filled" : "empty"}
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onChange(2)}
              disabled={disabled}
            >
              <i className="fa fa-star"></i>
            </div>
            <div
              className={activeRating >= 3 ? "filled" : "empty"}
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onChange(3)}
              disabled={disabled}
            >
              <i className="fa fa-star"></i>
            </div>
            <div
              className={activeRating >= 4 ? "filled" : "empty"}
              onMouseEnter={() => handleMouseEnter(4)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onChange(4)}
              disabled={disabled}
            >
              <i className="fa fa-star"></i>
            </div>
            <div
              className={activeRating >= 5 ? "filled" : "empty"}
              onMouseEnter={() => handleMouseEnter(5)}
              onMouseLeave={handleMouseLeave}
              onClick={() => onChange(5)}
              disabled={disabled}
            >
              <i className="fa fa-star"></i>
            </div>
          </div>
        </div>
      );
}

export default ReviewRatingInput;
