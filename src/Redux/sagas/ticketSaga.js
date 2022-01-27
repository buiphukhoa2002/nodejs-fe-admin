import { put, call, takeLatest } from "redux-saga/effects";
import {
  createTicketService,
  deleteTicketService,
  getTicketDetailService,
  getTicketListService,
  updateTicketService,
} from "../../Services/ticketService";

import { STATUS_CODE } from "../../Utils/constants";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";

function* getTicketListSaga() {
  try {
    const { data, status } = yield call(getTicketListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_TICKET_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getTicketDetailSaga(action) {
  try {
    const { data, status } = yield call(getTicketDetailService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_TICKET_DETAIL,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createTicketSaga(action) {
  try {
    const { status } = yield call(createTicketService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      yield put({
        type: sagaTypes.GET_TICKET_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateTicketSaga(action) {
  try {
    const { status } = yield call(updateTicketService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_TICKET_LIST_SAGA,
      });
      yield put({
        type: sagaTypes.GET_TICKET_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// action.payload = a ticket object
function* deleteTicketSaga(action) {
  try {
    const { status } = yield call(deleteTicketService(action.payload.id));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_TICKET_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetTicketListSaga() {
  yield takeLatest(sagaTypes.GET_TICKET_LIST_SAGA, getTicketListSaga);
}

export function* watchGetTicketDetailSaga() {
  yield takeLatest(sagaTypes.GET_TICKET_DETAIL_SAGA, getTicketDetailSaga);
}

export function* watchCreateTicketSaga() {
  yield takeLatest(sagaTypes.CREATE_TICKET_SAGA, createTicketSaga);
}

export function* watchUpdateTicketSaga() {
  yield takeLatest(sagaTypes.UPDATE_TICKET_SAGA, updateTicketSaga);
}

export function* watchDeleteTicketSaga() {
  yield takeLatest(sagaTypes.DELETE_TICKET_SAGA, deleteTicketSaga);
}
