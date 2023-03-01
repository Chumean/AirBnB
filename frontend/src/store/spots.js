

// action types
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const ADD_SPOT = "spots/ADD_SPOT";
const REMOVE_SPOT = "spots/REMOVE_SPOT";
const SET_SPOT_IMAGES = 'spots/setSpotImages';

// action creators
const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});

export const setSpotImages = (spotImages) => ({
    type: SET_SPOT_IMAGES,
    payload: spotImages
  });

// thunk creators
// export const getAllSpots = () => async (dispatch) => {
//   try {
//     // make a request to the backend API to get all spots
//     const res = await fetch("/api/spots");
//     if (!res.ok) {
//       throw res;
//     }
//     const data = await res.json();

//     dispatch(loadSpots(data.spots));
//   } catch (err) {
//     console.error(err);

//   }
// };
export const getAllSpots = () => async dispatch => {
    const response = await fetch('/api/spots');
    if (response.ok) {
      const spotsData = await response.json();
      dispatch(loadSpots(spotsData.spots));
      dispatch(setSpotImages(spotsData.spotImages));
    }
  };


export const createSpot = (spotData) => async (dispatch) => {
  try {

    const res = await fetch("/api/spots", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spotData),
    });
    if (!res.ok) {
      throw res;
    }
    const data = await res.json();

    dispatch(addSpot(data.spot));
  } catch (err) {
    console.error(err);

  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  try {

    const res = await fetch(`/api/spots/${spotId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw res;
    }

    dispatch(removeSpot(spotId));
  } catch (err) {
    console.error(err);

  }
};

// initial state
const initialState = {
  isLoading: false,
  spots: {},
};

// reducer
const spotsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case LOAD_SPOTS:
      newState = {
        ...state,
        isLoading: false,
        spots: action.spots,
      };
      return newState;

    case SET_SPOT_IMAGES:
        return {
            ...state,
            spotImages: action.payload
        }
    case ADD_SPOT:
      newState = {
        ...state,
        spots: {
          ...state.spots,
          [action.spot.id]: action.spot,
        },
      };
      return newState;
    case REMOVE_SPOT:
      newState = {
        ...state,
        spots: {
          ...state.spots,
        },
      };
      delete newState.spots[action.spotId];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
