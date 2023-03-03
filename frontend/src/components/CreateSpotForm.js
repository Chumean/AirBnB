import CreateSpot from "./CreateSpot/CreateSpot";

const CreateSpotForm = () => {
    const spot = {
        test: ''
    };

    return (
        <CreateSpot spot={spot} formType="Create Spot" />
    )
}

export default CreateSpotForm;
