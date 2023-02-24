import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer
});

const loggerMiddleware = store => next => action => {
  console.log("Previous state:", store.getState());
  console.log("Action:", action);
  const result = next(action);
  console.log("Next state:", store.getState());
  return result;
};


let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger, loggerMiddleware));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
