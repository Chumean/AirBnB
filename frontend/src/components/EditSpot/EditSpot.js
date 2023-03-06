import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import CreateSpot from "../CreateSpot/CreateSpot";
import { createSpot } from "../../store/spots";


const EditSpot = () => {
    const history = useHistory();
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots[spotId]);


    console.log("HISTORY")
    console.log(history)
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedSpot = {
            ...spot,
            name: e.target.name.value,
            address: e.target.address.value,
            city: e.target.city.value,
            state: e.target.state.value,
            country: e.target.country.value,
            lat: e.target.lat.value,
            lng: e.target.lng.value,
            description: e.target.description.value,
            price: e.target.price.value,
        };

        await dispatch(createSpot(updatedSpot, 'PUT'));
        history.push(`/spots/${spotId}`);
    }

    return (
        <CreateSpot spot={spot} formType="Update Spot" onSubmit={handleSubmit}/>
    )
}

export default EditSpot;
