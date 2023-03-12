import { csrfFetch } from './csrf';


// action types
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";


// ACTION CREATORS

// Load Reviews Action
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
});

// Add Review Action
export const addReview = (review) => ({
  type: ADD_REVIEW,
  review,
});

// Remove Review Action
export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId,
});


// THUNK CREATORS

// all reviews thunk
export const getAllReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviews = await response.json();

    dispatch(loadReviews(reviews));
  }
};

// create review thunk
export const createReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(newReview));
    return newReview;
  }
};


// delete review thunk
export const deleteReview = (reviewId) => async (dispatch) => {
    console.log(reviewId)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    console.log(res)

    if (res.ok) {
      const reviews = await res.json()
      dispatch(removeReview(reviews));
    }

};

// INITIAL STATE
const initialState = {};

// REDUCER
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_REVIEWS:
      const loadState = {};
      action.reviews.forEach(review => loadState[review.spotId] = review);
      return {...state, ...loadState}

    case ADD_REVIEW:
      return {...state, [action.review.id]: action.review};

    case REMOVE_REVIEW:
      const deleteState = {...state};
      delete deleteState[action.reviewId.id]
      return deleteState;

    default:
      return state;
  }
};

export default reviewsReducer;
