import { actionTypes } from "../constants/actionTypes";

const initialState = {
  user: null,
  userList: [],
  userDetail: {},
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_USER:
      state.user = payload;
      return { ...state };

    case actionTypes.SAVE_USER_LIST:
      state.userList = payload;
      return { ...state };

    case actionTypes.SAVE_USER_DETAIL:
      state.userDetail = payload;
      return { ...state };

    default:
      return state;
  }
};

export default userReducer;
