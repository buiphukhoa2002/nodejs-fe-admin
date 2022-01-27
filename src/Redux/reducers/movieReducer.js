import { actionTypes } from "../constants/actionTypes";

const initialState = {
  movieList: [],
  movieDetail: null,
};

const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SAVE_MOVIE_LIST:
      state.movieList = payload;
      return { ...state };

    case actionTypes.SAVE_MOVIE_DETAIL:
      state.movieDetail = payload;
      return { ...state };

    default:
      return state;
  }
};

export default movieReducer;
