import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./sagas/rootSaga";
import userReducer from "./reducers/userReducer";
import movieReducer from "./reducers/movieReducer";
import cinemaSystemReducer from "./reducers/cinemaSystemReducer";
import cinemaReducer from "./reducers/cinemaReducer";
import cinemaRoomReducer from "./reducers/cinemaRoomReducer";
import showtimeReducer from "./reducers/showtimeReducer";
import seatReducer from "./reducers/seatReducer";
import ticketReducer from "./reducers/ticketReducer";

const middleWareSaga = createSagaMiddleware();

const rootReducer = combineReducers({
  userReducer,
  movieReducer,
  cinemaSystemReducer,
  cinemaReducer,
  cinemaRoomReducer,
  showtimeReducer,
  seatReducer,
  ticketReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middleWareSaga))
);

middleWareSaga.run(rootSaga);

export default store;
