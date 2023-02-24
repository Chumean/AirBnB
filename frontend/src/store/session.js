// import { csrfFetch } from "./csrf";

// // Action type
// const SET_USER = 'session/setUser';
// const NO_USER = 'session/noUser';


// // Action creator
// export const setUser = (user) => {
//     return {
//         type: SET_USER,
//         payload: user
//     }
// };

// export const noUser = () => {
//     return {
//         type: NO_USER
//     }
// };

// // Thunk
// export const loadUser = (user) => async(dispatch) => {
//     const res = await csrfFetch('/api/session', {
//         method: 'POST',
//         body: JSON.stringify(user)
//     });

//     const data = await res.json();
//     dispatch(setUser(data.user));
// }

// const initialState = {
//     user: null
// };

// // Reducer
// const sessionReducer = (state = initialState, action) => {
//     switch(action.type) {

//         case SET_USER:
//             return { ...state, user: action.payload};

//         case NO_USER:
//             return { ...state, user: null}
//         default:
//             return state;
//     }
// }

// export default sessionReducer;


// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};


export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
