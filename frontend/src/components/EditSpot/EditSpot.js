// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useHistory } from "react-router-dom";
// import CreateSpot from "../CreateSpot/CreateSpot";
// import { updateSpot } from "../../store/spots";


// const EditSpot = () => {
//     const history = useHistory();
//     const { spotId } = useParams();
//     const dispatch = useDispatch();
//     const spot = useSelector(state => state.spots[spotId]);


//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const updatedSpot = {
//             ...spot,
//             name: e.target.name.value,
//             address: e.target.address.value,
//             city: e.target.city.value,
//             state: e.target.state.value,
//             country: e.target.country.value,
//             lat: e.target.lat.value,
//             lng: e.target.lng.value,
//             description: e.target.description.value,
//             price: e.target.price.value,
//         };

//         await dispatch(updateSpot(updatedSpot))
//         history.push(`/spots/${spotId}`);
//     }

//     return (
//         <CreateSpot spot={spot} formType="Update Spot" onSubmit={handleSubmit}/>
//     )
// }

// export default EditSpot;
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";
import { updateSpot } from "../../store/spots";

const EditSpot = () => {
  const history = useHistory();
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots[spotId]);

  const handleSubmit = async (updatedSpot) => {
    await dispatch(updateSpot(updatedSpot));
    history.push(`/spots/${spotId}`);
  };

  return (
    <div>
      <h2>Edit Spot</h2>
      <EditSpotForm spot={spot} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditSpot;
