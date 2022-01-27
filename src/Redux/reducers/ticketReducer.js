import { actionTypes } from "../constants/actionTypes";

const initialState = {
  ticketList: [],
  ticketDetail: null,
};

const ticketReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_TICKET_LIST:
      return { ...state, ticketList: payload };

    case actionTypes.SAVE_TICKET_DETAIL:
      return { ...state, ticketDetail: payload };

    default:
      return state;
  }
};

export default ticketReducer;
