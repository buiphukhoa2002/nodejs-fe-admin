import { put, call, takeLatest } from "redux-saga/effects";
import {
  createCinemaRoomService,
  deleteCinemaRoomService,
  getCinemaRoomDetailService,
  getCinemaRoomListService,
  updateCinemaRoomService,
} from "../../Services/cinemaRoomService";

import { STATUS_CODE } from "../../Utils/constants";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getCinemaRoomListSaga(action) {
  try {
    const { data, status } = yield call(getCinemaRoomListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_ROOM_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getCinemaRoomDetailSaga(action) {
  try {
    const { data, status } = yield call(
      getCinemaRoomDetailService(action.payload)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_CINEMA_ROOM_DETAIL,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createCinemaRoomSaga(action) {
  try {
    const { status } = yield call(createCinemaRoomService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_ROOM_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateCinemaRoomSaga(action) {
  try {
    const { status } = yield call(updateCinemaRoomService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_ROOM_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_CINEMA_ROOM_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// action.payload = a cinemaRoom object
function* deleteCinemaRoomSaga(action) {
  try {
    const { status } = yield call(deleteCinemaRoomService(action.payload.id));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_CINEMA_ROOM_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_CINEMA_DETAIL_SAGA,
        payload: action.payload.cinemaId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetCinemaRoomListSaga() {
  yield takeLatest(sagaTypes.GET_CINEMA_ROOM_LIST_SAGA, getCinemaRoomListSaga);
}

export function* watchGetCinemaRoomDetailSaga() {
  yield takeLatest(
    sagaTypes.GET_CINEMA_ROOM_DETAIL_SAGA,
    getCinemaRoomDetailSaga
  );
}

export function* watchCreateCinemaRoomSaga() {
  yield takeLatest(sagaTypes.CREATE_CINEMA_ROOM_SAGA, createCinemaRoomSaga);
}

export function* watchUpdateCinemaRoomSaga() {
  yield takeLatest(sagaTypes.UPDATE_CINEMA_ROOM_SAGA, updateCinemaRoomSaga);
}

export function* watchDeleteCinemaRoomSaga() {
  yield takeLatest(sagaTypes.DELETE_CINEMA_ROOM_SAGA, deleteCinemaRoomSaga);
}
