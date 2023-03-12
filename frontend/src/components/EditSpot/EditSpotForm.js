import { useState } from 'react';
import './EditSpot.css';

const EditSpotForm = ({ spot, onSubmit }) => {
  const [name, setName] = useState(spot.name);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSpot = {
      ...spot,
      name,
      address,
      city,
      state,
      country,
      lat,
      lng,
      description,
      price,
    };
    onSubmit(updatedSpot);
  };

  return (
    <div className='edit-spot-form-container'>

    <form onSubmit={handleSubmit}>
            <h1 className='create-form-header'>Create A Spot</h1>
            <h2 className='create-form-header'>Where's your place located?</h2>
            <h4 className='create-form-header'>Guests will only get your exact address once they booked a reservation</h4>

      <label className='edit-label'>
        Name
        <input
        className='edit-input'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} />
      </label>

      <label className='edit-label'>
        Address:
        <input
        className='edit-input'
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)} />
      </label>

      <label className='edit-label'>
        City
        <input
        className='edit-input'
        type="text" value={city}
        onChange={(e) => setCity(e.target.value)} />
      </label>

      <label className='edit-label'>
        State
        <input
        className='edit-input'
        type="text"
        value={state}
        onChange={(e) => setState(e.target.value)} />
      </label>

      <label className='edit-label'>
        Country
        <input
        className='edit-input'
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)} />
      </label>

      <hr className='spot-line-break' />

      <label className='edit-label'>
        Latitude
        <input
        className='edit-input'
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)} />
      </label>

      <label className='edit-label'>
        Longitude
        <input
        className='edit-input'
        type="text"
        value={lng}
        onChange={(e) => setLng(e.target.value)} />
      </label>

      <label className='edit-label'>
        Description
        <textarea
        className='edit-input'
        value={description}
        onChange={(e) => setDescription(e.target.value)} />
      </label>

      <label className='edit-label'>
        Price
        <input
        className='edit-input'
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)} />
      </label>

      <hr className='spot-line-break' />

      <button
      className='submit-spot'
       ype="submit">Update Spot</button>
    </form>
    </div>
  );
};

export default EditSpotForm;
