import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateSpot from "./CreateSpot";

const EditSpot = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId]);

    return (
        <CreateSpot spot={spot} formType="Update Spot" />
    )
}

export default EditSpot;
