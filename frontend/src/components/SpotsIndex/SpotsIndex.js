import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotsIndexItem from '../SpotsIndexItem';
import "./SpotsIndex.css";

function SpotsIndex() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots)
  const spotsObj = Object.values(spots);

  console.log("SPOTS", spots)

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  return (
    <div className='spots-container'>
      <h1>Spots</h1>
      <ul className='spots-list'>
        {spotsObj.map(spot => (
            <SpotsIndexItem
            key={spot.id}
            spot={spot}
            previewImage={spot.previewImage}
            spotsOBj={spotsObj}
            />
        ))}
      </ul>
    </div>
  );
}



export default SpotsIndex;
