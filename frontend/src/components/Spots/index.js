// import { useEffect, useState } from 'react';
// import { getAllSpots } from '../../store/spots';

// function Spots() {
//   const [spots, setSpots] = useState([]);

//   useEffect(() => {
//     async function getSpots() {
//       const response = await fetch('/api/spots');
//       const spotsData = await response.json();
//       setSpots(spotsData.spots);
//     }
//     getSpots();
//   }, []);

//   return (
//     <div>
//       <h1>Spots</h1>
//       <ul>
//         {spots.map(spot => (
//           <li key={spot.id}>
//             <h2>{spot.name}</h2>
//             <p>{spot.description}</p>
//             <p>Price: {spot.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Spots;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';

function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);
  const spotImages = useSelector(state => state.spots.spotImages);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  // return (
  //   <div>
  //     <h1>Spots</h1>
  //     <ul>
  //       {Object.values(spots).map(spot => (
  //         <li key={spot.id}>
  //           <h2>{spot.name}</h2>
  //           <p>{spot.description}</p>
  //           <p>Price: {spot.price}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  console.log('spots:', spots);
  console.log('spotImages:', spotImages);
  return (
    <div>
      <h1>Spots</h1>
      <ul>
        {Object.values(spots).map(spot => (
          <li key={spot.id}>
            <h2>{spot.name}</h2>
            <p>{spot.description}</p>
            <p>Price: {spot.price}</p>
            {/* {spotImages.filter(img => img.spotId === spot.id).map(img => (
              <img key={img.id} src={img.url} alt={spot.name} />
            ))} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Spots;
