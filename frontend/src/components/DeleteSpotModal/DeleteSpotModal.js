import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteSpot } from '../../store/spots';
// import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent, setOnModalClose, closeModal } = useModal();

  const handleDeleteSpot = async () => {
    return dispatch(deleteSpot(spotId))
    .then(closeModal)

  };

  const onClose = () => {
    // Clear the modal content and onModalClose once the modal is closed
    setModalContent(null);
    setOnModalClose(null);
  };

  return (
    <div className='confirm-delete-container'>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <div className='delete-spot-buttons'>
        <button className='yes-delete-spot' onClick={handleDeleteSpot}>Yes (Delete Spot)</button>
        <button className='no-delete-spot' onClick={onClose}>No (Keep Spot)</button>
      </div>
    </div>
  );
}

// function DeleteSpotMenuItem({ spotId }) {
//   const { setModalContent, setOnModalClose } = useModal();

//   const onOpen = () => {
//     // Set the modal content to the DeleteSpotModal component
//     setModalContent(<DeleteSpotModal spotId={spotId} />);
//     // Set the onModalClose callback function to clear the modal content and onModalClose
//     setOnModalClose(() => {
//       setModalContent(null);
//       setOnModalClose(null);
//     });
//   };

//   return <OpenModalMenuItem modalComponent={<DeleteSpotModal spotId={spotId} />} itemText="Delete" onItemClick={onOpen} />;
// }

export default DeleteSpotModal;
