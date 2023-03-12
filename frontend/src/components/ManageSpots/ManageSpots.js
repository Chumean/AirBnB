import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpotsIndexItem from '../SpotsIndexItem';
import { getAllSpots } from '../../store/spots';
import { useParams, Link } from 'react-router-dom';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './ManageSpots.css';

const ManageSpots = () => {
  const dispatch = useDispatch();
  const {spotId} = useParams();
  const currentUser = useSelector((state) => state.session?.user);
  const spots = useSelector((state) => state.spots);


  const filteredSpots = Object.values(spots).filter(spot => spot.ownerId === currentUser.id);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  return (

    <div className='spots-container'>
      <h1 className='my-manage-spots'>My Spots</h1>
      <ul className='spots-list'>
        {filteredSpots.map(spot => (
        <div key={spot.id}>

          <SpotsIndexItem
            key={spot.id}
            spot={spot}
            previewImage={spot.previewImage}
            />

          <Link
            to={`/spots/${spotId}/edit`}>
            <button
            className='manage-update-button'
            disabled={!currentUser}>Update</button>
          </Link>

          <button className='manage-button'>
            <OpenModalMenuItem
              itemText={'Delete'}
              modalComponent={<DeleteSpotModal spotId={spot.id} />}
              />
          </button>

        </div>
        ))}
      </ul>
    </div>
  );
}

export default ManageSpots;
