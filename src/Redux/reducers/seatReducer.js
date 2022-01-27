import { actionTypes } from "../constants/actionTypes";

const initialState = {
  seatList: [],
  seatDetail: null,
};

const seatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_SEAT_LIST:
      return { ...state, seatList: payload };

    case actionTypes.SAVE_SEAT_DETAIL:
      return { ...state, seatDetail: payload };

    default:
      return state;
  }
};

export default seatReducer;
