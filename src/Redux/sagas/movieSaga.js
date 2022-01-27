import { put, call, takeLatest } from "redux-saga/effects";
import {
  createMovieService,
  deleteMovieService,
  getMovieDetailService,
  getMovieListService,
  updateMovieService,
  uploadMoviePosterService,
} from "../../Services/movieService";
import { STATUS_CODE } from "../../Utils/constants";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getMovieListSaga(action) {
  try {
    const { data, status } = yield call(getMovieListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_MOVIE_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getMovieDetailSaga(action) {
  try {
    const { data, status } = yield call(getMovieDetailService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_MOVIE_DETAIL,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createMovieSaga(action) {
  try {
    const { status } = yield call(createMovieService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      yield put({
        type: sagaTypes.GET_MOVIE_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateMovieSaga(action) {
  try {
    const { status } = yield call(updateMovieService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_MOVIE_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_MOVIE_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteMovieSaga(action) {
  try {
    const { status } = yield call(deleteMovieService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_MOVIE_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* uploadMoviePosterSaga(action) {
  try {
    const { status } = yield call(uploadMoviePosterService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_MOVIE_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_MOVIE_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetMovieListSaga() {
  yield takeLatest(sagaTypes.GET_MOVIE_LIST_SAGA, getMovieListSaga);
}

export function* watchGetMovieDetailSaga() {
  yield takeLatest(sagaTypes.GET_MOVIE_DETAIL_SAGA, getMovieDetailSaga);
}

export function* watchCreateMovieSaga() {
  yield takeLatest(sagaTypes.CREATE_MOVIE_SAGA, createMovieSaga);
}

export function* watchUpdateMovieSaga() {
  yield takeLatest(sagaTypes.UPDATE_MOVIE_SAGA, updateMovieSaga);
}

export function* watchDeleteMovieSaga() {
  yield takeLatest(sagaTypes.DELETE_MOVIE_SAGA, deleteMovieSaga);
}

export function* watchUploadMoviePosterSaga() {
  yield takeLatest(sagaTypes.UPDATE_MOVIE_POSTER_SAGA, uploadMoviePosterSaga);
}
