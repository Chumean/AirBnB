import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spots';
import SpotsIndexItem from '../SpotsIndexItem';
import "./SpotsIndex.css";

function SpotsIndex() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots)
  const spotsOBj = Object.values(spots);



  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  return (
    <div className='spots-container'>
      <h1>Spots</h1>
      <ul className='spots-list'>
        {spotsOBj.map(spot => (
            <SpotsIndexItem
            key={spot.id}
            spot={spot}
            spotsOBj={spotsOBj}
            />
        ))}
      </ul>
    </div>
  );
}



export default SpotsIndex;
