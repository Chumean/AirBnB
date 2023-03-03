import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSpotInfo } from '../../store/spots';
import { useEffect } from 'react';

function SpotDetails() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots);
    const spotDetails = spots.details;
    console.log(spotDetails)

    useEffect(() => {
        dispatch(getSpotInfo(spotId))
    }, [dispatch, spotId])


  return (
    <div>
        <h2>test</h2>
        <ul>
        {Object.values(spots).map(spot => (
          <li key={spot.id}>
            <h2>{spot.name}</h2>
            <p>{spot.address}</p>
            <p>{spot.city}</p>
            <p>{spot.state}</p>
            <p>{spot.country}</p>
            <p>{spot.lat}</p>
            <p>{spot.lng}</p>
            <p>{spot.description}</p>
            <p>${spot.price}</p>
            <img key={spot.id} src={spot.previewImage} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpotDetails;
