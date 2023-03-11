import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { deleteSpot } from '../../store/spots';
import OpenModalMenuItem from '../OpenModalMenuItem/OpenModalMenuItem';

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setModalContent, setOnModalClose } = useModal();

  const handleDeleteSpot = async () => {
    await dispatch(deleteSpot(spotId));
    await history.push('/');
  };

  const onClose = () => {
    // Clear the modal content and onModalClose once the modal is closed
    setModalContent(null);
    setOnModalClose(null);
  };

  return (
    <>
      <h2>Delete Spot</h2>
      <p>Are you sure you want to delete this spot?</p>
      <div>
        <button onClick={handleDeleteSpot}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </>
  );
}

function DeleteSpotMenuItem({ spotId }) {
  const { setModalContent, setOnModalClose } = useModal();

  const onOpen = () => {
    // Set the modal content to the DeleteSpotModal component
    setModalContent(<DeleteSpotModal spotId={spotId} />);
    // Set the onModalClose callback function to clear the modal content and onModalClose
    setOnModalClose(() => {
      setModalContent(null);
      setOnModalClose(null);
    });
  };

  return <OpenModalMenuItem modalComponent={<DeleteSpotModal spotId={spotId} />} itemText="Remove Listing" onItemClick={onOpen} />;
}

export default DeleteSpotMenuItem;
