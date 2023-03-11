import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpotsIndexItem from '../SpotsIndexItem';
import { getAllSpots } from '../../store/spots';
import { useParams } from 'react-router-dom';
import { deleteSpot } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

const ManageSpots = () => {
  const history = useHistory();
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

            <button className='button-delete'>

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
