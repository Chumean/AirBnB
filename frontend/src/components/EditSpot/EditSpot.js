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
      <h2>Update Spot</h2>
      {spot && <EditSpotForm spot={spot} onSubmit={handleSubmit} />}
    </div>
  );
};

export default EditSpot;
