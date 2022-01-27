import { actionTypes } from "../constants/actionTypes";

const initialState = {
  cinemaList: [],
  cinemaDetail: null,
};

const cinemaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_CINEMA_LIST:
      state.cinemaList = payload;
      return { ...state };

    case actionTypes.SAVE_CINEMA_DETAIL:
      state.cinemaDetail = payload;
      return { ...state };

    default:
      return state;
  }
};

export default cinemaReducer;
