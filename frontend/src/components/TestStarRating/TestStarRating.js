// import { useState } from "react"
// import './TestStarRating.css';

// const TestStarRating = () => {
//     const [rating, setRating] = useState(null);
//     const [hover, setHover] = useState(null);

//     return (
//         <div>
//             {[...Array(5)].map((star, i) => {
//                 const ratingValue = i + 1;


//             return (
//                 <label>
//                     <input
//                     type='radio'
//                     name="rating"
//                     value={ratingValue}
//                     onClick={() => setHover(ratingValue)}
//                     />

//                     <i
//                     key={ratingValue}
//                     className="fa fa-star star"
//                     style={{color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}}
//                     onMouseEnter={() => setHover(ratingValue)}
//                     onMouseLeave={() => setHover(null)}
//                     />
//                 </label>
//                 )
//             })}
//         </div>
//     )
// }

// export default TestStarRating;
