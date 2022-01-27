import { actionTypes } from "../constants/actionTypes";

const initialState = {
  cinemaRoomList: [],
  cinemaRoomDetail: null,
};

const cinemaRoomReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_CINEMA_ROOM_LIST:
      state.cinemaRoomList = payload;
      return { ...state };

    case actionTypes.SAVE_CINEMA_ROOM_DETAIL:
      state.cinemaRoomDetail = payload;
      return { ...state };

    default:
      return state;
  }
};

export default cinemaRoomReducer;
