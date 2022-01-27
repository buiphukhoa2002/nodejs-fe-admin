import { put, call, takeLatest } from "redux-saga/effects";
import {
  createShowtimeService,
  deleteShowtimeService,
  getShowtimeDetailService,
  getShowtimeListService,
  updateShowtimeService,
} from "../../Services/showtimeService";

import { STATUS_CODE } from "../../Utils/constants";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getShowtimeListSaga(action) {
  try {
    const { data, status } = yield call(getShowtimeListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_SHOWTIME_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getShowtimeDetailSaga(action) {
  try {
    const { data, status } = yield call(
      getShowtimeDetailService(action.payload)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_SHOWTIME_DETAIL,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createShowtimeSaga(action) {
  try {
    const { status } = yield call(createShowtimeService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      yield put({
        type: sagaTypes.GET_SHOWTIME_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateShowtimeSaga(action) {
  try {
    const { status } = yield call(updateShowtimeService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_SHOWTIME_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_SHOWTIME_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// action.payload = a showtime object
function* deleteShowtimeSaga(action) {
  try {
    const { status } = yield call(deleteShowtimeService(action.payload.id));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_SHOWTIME_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_CINEMA_ROOM_DETAIL_SAGA,
        payload: action.payload.cinemaRoomId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetShowtimeListSaga() {
  yield takeLatest(sagaTypes.GET_SHOWTIME_LIST_SAGA, getShowtimeListSaga);
}

export function* watchGetShowtimeDetailSaga() {
  yield takeLatest(sagaTypes.GET_SHOWTIME_DETAIL_SAGA, getShowtimeDetailSaga);
}

export function* watchCreateShowtimeSaga() {
  yield takeLatest(sagaTypes.CREATE_SHOWTIME_SAGA, createShowtimeSaga);
}

export function* watchUpdateShowtimeSaga() {
  yield takeLatest(sagaTypes.UPDATE_SHOWTIME_SAGA, updateShowtimeSaga);
}

export function* watchDeleteShowtimeSaga() {
  yield takeLatest(sagaTypes.DELETE_SHOWTIME_SAGA, deleteShowtimeSaga);
}
