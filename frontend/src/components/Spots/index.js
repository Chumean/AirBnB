import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';


function Spots() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);


  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  return (
    <div>
      <h1>Spots</h1>
      <ul>
        {Object.values(spots).map(spot => (
          <li key={spot.id}>
            <h2>{spot.name}</h2>
            <p>{spot.description}</p>
            <p>Price: ${spot.price} per night</p>
            <img key={spot.id} src={spot.previewImage} />
          </li>
        ))}
      </ul>
      <Link to="/spots/new">List a Spot</Link>
    </div>
  );
}

export default Spots;
