import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpotsIndexItem from '../SpotsIndexItem';
import { getAllSpots } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
import { useHistory } from 'react-router-dom';


const ManageSpots = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const currentUser = useSelector((state) => state.session?.user);
  const spots = useSelector((state) => state.spots);


  const filteredSpots = Object.values(spots).filter(spot => spot.ownerId === currentUser.id);
    // console.log(filteredSpots)
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  const handleDeleteSpot = async(e) => {
    console.log("DELETE?")
    e.preventDefault();
    await dispatch(deleteSpot(spotId));
    // await history.push("/spots/current");
};


  return (

    <div className='spots-container'>
      <h1>My Spots</h1>
      <ul className='spots-list'>
        {filteredSpots.map(spot => (
        <div key={spot.id}>

          <SpotsIndexItem
            key={spot.id}
            spot={spot}
            previewImage={spot.previewImage}
            />
          <button>Update</button>

          <button
            onClick={handleDeleteSpot}
            // disabled={!currentUser}
          >Delete
          </button>

        </div>
        ))}
      </ul>
    </div>
  );
}

export default ManageSpots;
