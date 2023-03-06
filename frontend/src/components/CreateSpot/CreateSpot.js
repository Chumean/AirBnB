import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';

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
            setLat(0);
            setLng(0);
            setDescription('');
            setPrice(0)
        }
        console.log("AFTER useHISTORY()")
        console.log(newSpot)
    };


    return (
        <form onSubmit={handleSubmit}>

            <label>
                Name
                <input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                 />
            </label>

            <label>
                Address
                <input
                type='text'
                value={address}
                onChange={e => setAddress(e.target.value)}
                 />
            </label>

            <label>
                City
                <input
                type='text'
                value={city}
                onChange={e => setCity(e.target.value)}
                 />
            </label>

            <label>
                State
                <input
                type='text'
                value={state}
                onChange={e => setState(e.target.value)}
                 />
            </label>

            <label>
                Country
                <input
                type='text'
                value={country}
                onChange={e => setCountry(e.target.value)}
                 />
            </label>

            <label>
                Latitude
                <input
                type='text'
                value={lat}
                onChange={e => setLat(e.target.value)}
                 />
            </label>

            <label>
                Longitude
                <input
                type='text'
                value={lng}
                onChange={e => setLng(e.target.value)}
                 />
            </label>

            <label>
                Description
                <input
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
                 />
            </label>

            <label>
                Price
                <input
                type='text'
                value={price}
                onChange={e => setPrice(e.target.value)}
                 />
            </label>
            <input type="submit" value='Submit' />

        </form>
    )

}


export default CreateSpot;
