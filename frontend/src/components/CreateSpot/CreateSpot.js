import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import './CreateSpot.css';

const CreateSpot = ({spot = {}}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [address, setAddress] = useState(spot.address || '');
    const [city, setCity] = useState(spot.city || '');
    const [state, setState] = useState(spot.state || '');
    const [country, setCountry] = useState(spot.country || '');
    const [lat, setLat] = useState(spot.lat || 0);
    const [lng, setLng] = useState(spot.lng || 0);
    const [name, setName] = useState(spot.name || '');
    const [description, setDescription] = useState(spot.description || '');
    const [price, setPrice] = useState(spot.price || 0);
    const [previewImage, setPreviewImage] = useState(spot.previewImage || '');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSpotInput = {
            ...spot,
            name: name,
            address: address,
            city: city,
            state: state,
            country: country,
            lat: lat,
            lng: lng,
            description: description,
            price: price,
            previewImage: previewImage
        };

        let newSpot;
        newSpot = await dispatch(createSpot(newSpotInput));


        if(newSpot) {
            history.push(`/spots/${newSpot.id}`);

            setName('');
            setAddress('');
            setCity('');
            setState('');
            setCountry('');
            setLat(null);
            setLng(null);
            setDescription('');
            setPrice(null)
            setPreviewImage('');
        }

    };


    return (
        <div className='createspot-form-container'>
        <form onSubmit={handleSubmit} className="create-form-layout">
            <h1 className='create-form-header'>Create A Spot</h1>
            <h2 className='create-form-header'>Where's your place located?</h2>
            <h4 className='create-form-header'>Guests will only get your exact address once they booked a reservation</h4>

            <label className='spot-label'>
                <h2>Create a title for your spot</h2>
                <h3>Catch guests' attention with a spot title that highlights what makes your place special</h3>
                <input
                className='spot-input'
                type='text'
                placeholder='Name of your spot'
                value={name}
                onChange={e => setName(e.target.value)}
                 />
            </label>

            <hr className='spot-line-break' />

            <label className='spot-label'>
                <h3>Address</h3>
                <input
                className='spot-input'
                type='text'
                placeholder='Address'
                value={address}
                onChange={e => setAddress(e.target.value)}
                 />
            </label>



            <label className='spot-label'>
                <h3>City</h3>
                <input
                className='spot-input'
                type='text'
                placeholder='City'
                value={city}
                onChange={e => setCity(e.target.value)}
                 />
            </label>



            <label className='spot-label'>
                <h3>State</h3>
                <input
                className='spot-input'
                type='text'
                placeholder='State'
                value={state}
                onChange={e => setState(e.target.value)}
                 />
            </label>



            <label className='spot-label'>
                <h3>Country</h3>
                <input
                className='spot-input'
                type='text'
                placeholder='Country'
                value={country}
                onChange={e => setCountry(e.target.value)}
                 />
            </label>

            <hr className='spot-line-break' />

            <label className='spot-label'>
                <h3>Latitude</h3>
                <input
                className='spot-input'
                type='text'
                placeholder='Latitude'
                value={lat}
                onChange={e => setLat(e.target.value)}
                 />
            </label>



            <label className='spot-label'>
                <h3>Longitude</h3>
                <input
                className='spot-input'
                type='text'
                placeholder='Longitude'
                value={lng}
                onChange={e => setLng(e.target.value)}
                 />
            </label>

            <hr className='spot-line-break' />

            <label className='spot-label'>

                <textarea
                className='spot-input'
                placeholder='Please write at least 30 characters'
                value={description}
                onChange={e => setDescription(e.target.value)}
                 />
            </label>

            {/* <hr className='spot-line-break' /> */}

            <label className='spot-label'>
                <h4>
                Set a base price for your spot

                </h4>
                <input
                className='spot-input'
                type='text'
                placeholder='Price per night (USD)'
                value={price}
                onChange={e => setPrice(e.target.value)}
                 />
            </label>
            <hr className='spot-line-break' />
            <label className='spot-label'>

                <input
                className='spot-input'
                placeholder='Preview Image URL'
                type="text"
                value={previewImage}
                onChange={e => setPreviewImage(e.target.value)}
                />
            </label>

            {/* <hr className='spot-line-break' /> */}

            <button
            className='submit-spot'
            type="submit">
                Create Spot
            </button>

        </form>
        </div>
    )

}


export default CreateSpot;
