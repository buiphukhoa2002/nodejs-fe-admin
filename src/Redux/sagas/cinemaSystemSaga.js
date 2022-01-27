import { put, call, takeLatest } from "redux-saga/effects";
import {
  createCinemaSystemService,
  deleteCinemaSystemService,
  getCinemaSystemDetailService,
  getCinemaSystemListService,
  updateCinemaSystemLogoService,
  updateCinemaSystemService,
} from "../../Services/cinemaSystemService";

import { STATUS_CODE } from "../../Utils/constants";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getCinemaSystemListSaga(action) {
  try {
    const { data, status } = yield call(getCinemaSystemListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_SYSTEM_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getCinemaSystemDetailSaga(action) {
  try {
    const { data, status } = yield call(
      getCinemaSystemDetailService(action.payload)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_SYSTEM_DETAIL,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createCinemaSystemSaga(action) {
  try {
    const { status } = yield call(createCinemaSystemService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCinemaSystemSaga(action) {
  try {
    const { status } = yield call(updateCinemaSystemService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
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

function* deleteCinemaSystemSaga(action) {
  try {
    const { status } = yield call(deleteCinemaSystemService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCinemaSystemPosterSaga(action) {
  try {
    const { status } = yield call(
      updateCinemaSystemLogoService(action.payload)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
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

export function* watchGetCinemaSystemListSaga() {
  yield takeLatest(
    sagaTypes.GET_CINEMA_SYSTEM_LIST_SAGA,
    getCinemaSystemListSaga
  );
}

export function* watchGetCinemaSystemDetailSaga() {
  yield takeLatest(
    sagaTypes.GET_CINEMA_SYSTEM_DETAIL_SAGA,
    getCinemaSystemDetailSaga
  );
}

export function* watchCreateCinemaSystemSaga() {
  yield takeLatest(sagaTypes.CREATE_CINEMA_SYSTEM_SAGA, createCinemaSystemSaga);
}

export function* watchUpdateCinemaSystemSaga() {
  yield takeLatest(sagaTypes.UPDATE_CINEMA_SYSTEM_SAGA, updateCinemaSystemSaga);
}

export function* watchDeleteCinemaSystemSaga() {
  yield takeLatest(sagaTypes.DELETE_CINEMA_SYSTEM_SAGA, deleteCinemaSystemSaga);
}

export function* watchUploadCinemaSystemPosterSaga() {
  yield takeLatest(
    sagaTypes.UPDATE_CINEMA_SYSTEM_LOGO_SAGA,
    updateCinemaSystemPosterSaga
  );
}
