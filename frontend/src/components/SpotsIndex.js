import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../store/spots';
import SpotsIndexItem from './SpotsIndexItem';

function SpotsIndex() {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots)
    const spotsOBj = Object.values(spots);
  console.log(spotsOBj.map(spot => spot.previewImage))


  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  return (
    <div>
      <h1>Spots</h1>
      <ul>
        {spotsOBj.map(spot => (
            <SpotsIndexItem
            key={spot.id}
            spot={spot}
            />
        ))}


      </ul>

      {/* <Link to="/spots/new">List a Spot</Link> */}
    </div>
  );
}



export default SpotsIndex;
