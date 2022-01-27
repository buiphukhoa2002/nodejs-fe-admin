import { put, call, takeLatest } from "redux-saga/effects";
import {
  createCinemaService,
  deleteCinemaService,
  getCinemaDetailService,
  getCinemaListService,
  updateCinemaImageService,
  updateCinemaService,
} from "../../Services/cinemaService";

import { STATUS_CODE } from "../../Utils/constants";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getCinemaListSaga(action) {
  try {
    const { data, status } = yield call(getCinemaListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getCinemaDetailSaga(action) {
  try {
    const { data, status } = yield call(getCinemaDetailService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_DETAIL,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createCinemaSaga(action) {
  try {
    const { status } = yield call(createCinemaService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCinemaSaga(action) {
  try {
    const { status } = yield call(updateCinemaService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// action.payload = a cinema object
function* deleteCinemaSaga(action) {
  try {
    const { status } = yield call(deleteCinemaService(action.payload.id));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
        payload: action.payload.cinemaSystemId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCinemaImageSaga(action) {
  try {
    const { status } = yield call(updateCinemaImageService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetCinemaListSaga() {
  yield takeLatest(sagaTypes.GET_CINEMA_LIST_SAGA, getCinemaListSaga);
}

export function* watchGetCinemaDetailSaga() {
  yield takeLatest(sagaTypes.GET_CINEMA_DETAIL_SAGA, getCinemaDetailSaga);
}

export function* watchCreateCinemaSaga() {
  yield takeLatest(sagaTypes.CREATE_CINEMA_SAGA, createCinemaSaga);
}

export function* watchUpdateCinemaSaga() {
  yield takeLatest(sagaTypes.UPDATE_CINEMA_SAGA, updateCinemaSaga);
}

export function* watchDeleteCinemaSaga() {
  yield takeLatest(sagaTypes.DELETE_CINEMA_SAGA, deleteCinemaSaga);
}

export function* watchUploadCinemaImageSaga() {
  yield takeLatest(sagaTypes.UPDATE_CINEMA_IMAGE_SAGA, updateCinemaImageSaga);
}
