import { call, put, takeLatest } from "redux-saga/effects";
import {
  createSeatService,
  deleteSeatService,
  getSeatDetailService,
  getSeatsByShowtimeService,
  updateSeatService,
  createMultipleSeatsService,
} from "../../Services/seatService";
import { STATUS_CODE } from "../../Utils/constants";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getSeatsByShowtimeSaga(action) {
  try {
    const { data, status } = yield call(
      getSeatsByShowtimeService(action.payload)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_SEAT_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getSeatDetailSaga(action) {
  try {
    const { data, status } = yield call(getSeatDetailService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_SEAT_DETAIL,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createSeatSaga(action) {
  try {
    const { status } = yield call(createSeatService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      yield put({
        type: sagaTypes.GET_SEAT_LIST_BY_SHOWTIME_SAGA,
        payload: action.payload.showtimeId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createMultipleSeatsSaga(action) {
  try {
    const { status } = yield call(createMultipleSeatsService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      yield put({
        type: sagaTypes.GET_SEAT_LIST_BY_SHOWTIME_SAGA,
        payload: action.payload.showtimeId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateSeatSaga(action) {
  try {
    const { status } = yield call(updateSeatService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_SEAT_LIST_BY_SHOWTIME_SAGA,
        payload: action.payload.showtimeId,
      });
      yield put({
        type: sagaTypes.GET_SEAT_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// action.payload = a seat object
function* deleteSeatSaga(action) {
  try {
    const { status } = yield call(deleteSeatService(action.payload.id));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_SEAT_LIST_BY_SHOWTIME_SAGA,
        payload: action.payload.showtimeId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetSeatListByShowtimeSaga() {
  yield takeLatest(
    sagaTypes.GET_SEAT_LIST_BY_SHOWTIME_SAGA,
    getSeatsByShowtimeSaga
  );
}

export function* watchGetSeatDetailSaga() {
  yield takeLatest(sagaTypes.GET_SEAT_DETAIL_SAGA, getSeatDetailSaga);
}

export function* watchCreateSeatSaga() {
  yield takeLatest(sagaTypes.CREATE_SEAT_SAGA, createSeatSaga);
}

export function* watchCreateMultipleSeatsSaga() {
  yield takeLatest(
    sagaTypes.CREATE_MULTIPLE_SEATS_SAGA,
    createMultipleSeatsSaga
  );
}

export function* watchUpdateSeatSaga() {
  yield takeLatest(sagaTypes.UPDATE_SEAT_SAGA, updateSeatSaga);
}

export function* watchDeleteSeatSaga() {
  yield takeLatest(sagaTypes.DELETE_SEAT_SAGA, deleteSeatSaga);
}
