import { csrfFetch } from './csrf';

// action types
const LOAD_SPOTS = "spots/LOAD_SPOTS";
const INFO_SPOT = "spots/INFO_SPOT";
const ADD_SPOT = "spots/ADD_SPOT";
const REMOVE_SPOT = "spots/REMOVE_SPOT";


// action creators
const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export function infoSpot(spotId) {
    return {
        type: INFO_SPOT,
        spotId
    }
}

const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot,
});

const removeSpot = (spotId) => ({
  type: REMOVE_SPOT,
  spotId,
});



// thunk creators

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
      const spotsData = await response.json();
      dispatch(loadSpots(spotsData.spots));

    }
};

export const getSpotInfo = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(infoSpot(data));
        return res;
    }
}


export const createSpot = (spotData) => async (dispatch) => {
  try {

    const res = await csrfFetch("/api/spots", {
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

    const res = await csrfFetch(`/api/spots/${spotId}`, {
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
      console.log("NEWSTATE")
      console.log(newState)
      return newState;

    case INFO_SPOT:
        return {
            ...state,
            details: action.spotId
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
