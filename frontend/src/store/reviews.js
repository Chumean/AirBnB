import { csrfFetch } from './csrf';

// action types
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const ADD_REVIEW = "reviews/ADD_REVIEW";
const REMOVE_REVIEW = "reviews/REMOVE_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW";

// ACTION CREATORS

// Load Reviews Action
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
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

// Edit Review Action
export const editReview = (review) => ({
  type: EDIT_REVIEW,
  review,
});

// THUNK CREATORS

// all reviews thunk
export const getAllReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const reviewsData = await response.json();

    dispatch(loadReviews(reviewsData));
  }
};

// create review thunk
export const createReview = (review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({review: review.review, stars: review.stars}),
  });
  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(newReview));
    return newReview;
  }
};


// edit review thunk
export const updateReview = (review) => async (dispatch) => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });
  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(editReview(updatedReview));
    return updatedReview;
  }
};

// delete review thunk
export const deleteReview = (reviewId) => async (dispatch) => {

    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(removeReview(reviewId));
    }

};

// INITIAL STATE
const initialState = {};

// REDUCER
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const loadState = {};
      action.reviews.forEach(review => loadState[review.id] = review)
      return {...state, ...loadState}

    case ADD_REVIEW:
      return {...state, [action.review.id]: action.review};

    case REMOVE_REVIEW:
      const newState = {...state};
      delete newState[action.reviewId]
      return newState;

    case EDIT_REVIEW:
      const updatedReview = action.review;
      return { ...state, [updatedReview.id]: updatedReview };

    default:
      return state;
  }
};

export default reviewsReducer;
