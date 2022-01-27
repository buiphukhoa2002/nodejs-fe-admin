import { actionTypes } from "../constants/actionTypes";

const initialState = {
  cinemaSystemList: [],
  cinemaSystemDetail: null,
};

const cinemaSystemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_CINEMA_SYSTEM_LIST:
      state.cinemaSystemList = payload;
      return { ...state };

    case actionTypes.SAVE_CINEMA_SYSTEM_DETAIL:
      state.cinemaSystemDetail = payload;
      return { ...state };

    default:
      return state;
  }
};

export default cinemaSystemReducer;
