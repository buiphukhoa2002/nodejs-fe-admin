import { actionTypes } from "../constants/actionTypes";

const initialState = {
  showtimeList: [],
  showtimeDetail: null,
};

const showtimeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_SHOWTIME_LIST:
      state.showtimeList = payload;
      return { ...state };

    case actionTypes.SAVE_SHOWTIME_DETAIL:
      state.showtimeDetail = payload;
      return { ...state };

    default:
      return state;
  }
};

export default showtimeReducer;
