import { put, call, takeLatest } from "redux-saga/effects";
import { STATUS_CODE } from "../../Utils/constants";
import { actionTypes } from "../constants/actionTypes";
import { sagaTypes } from "../constants/sagaTypes";
import {
  createUserService,
  deleteUserService,
  getUserDetailService,
  getUserListService,
  getUserLoginService,
  signInService,
  updatePasswordService,
  updateUserAvatarService,
  updateUserService,
} from "./../../Services/userService";

function* signInSaga(action) {
  try {
    const { data, status } = yield call(signInService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      localStorage.setItem("ACCESS_TOKEN", data.token);
      yield put({
        type: actionTypes.SAVE_USER,
        payload: data,
      });
      action.callback();
    }
  } catch (error) {
    console.log(error);
  }
}

function* getUserLoginSaga(action) {
  try {
    const { data, status } = yield call(getUserLoginService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_USER,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getUserListSaga(action) {
  try {
    const { data, status } = yield call(getUserListService);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_USER_LIST,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* getUserDetailSaga(action) {
  try {
    const { data, status } = yield call(getUserDetailService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: actionTypes.SAVE_USER_DETAIL,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* createUserSaga(action) {
  try {
    const { data, status } = yield call(createUserService(action.payload));
    if (status === STATUS_CODE.CREATE_SUCCESS) {
      console.log(data);
      yield put({
        type: sagaTypes.GET_USER_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateUserSaga(action) {
  try {
    const { status } = yield call(updateUserService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_USER_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateUserPasswordSaga(action) {
  try {
    const { status } = yield call(updatePasswordService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_USER_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* deleteUserSaga(action) {
  try {
    const { status } = yield call(deleteUserService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_USER_LIST_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function* updateUserAvatarSaga(action) {
  try {
    const { status } = yield call(updateUserAvatarService(action.payload));
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: sagaTypes.GET_USER_DETAIL_SAGA,
        payload: action.payload.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchSignInSaga() {
  yield takeLatest(sagaTypes.SIGN_IN_SAGA, signInSaga);
}

export function* watchGetUserLoginSaga() {
  yield takeLatest(sagaTypes.GET_USER_LOGIN_SAGA, getUserLoginSaga);
}

export function* watchGetUserListSaga() {
  yield takeLatest(sagaTypes.GET_USER_LIST_SAGA, getUserListSaga);
}

export function* watchGetUserDetailSaga() {
  yield takeLatest(sagaTypes.GET_USER_DETAIL_SAGA, getUserDetailSaga);
}

export function* watchCreateUserSaga() {
  yield takeLatest(sagaTypes.CREATE_USER_SAGA, createUserSaga);
}

export function* watchUpdateUserSaga() {
  yield takeLatest(sagaTypes.UPDATE_USER_SAGA, updateUserSaga);
}

export function* watchUpdateUserPasswordSaga() {
  yield takeLatest(sagaTypes.UPDATE_USER_PASSWORD_SAGA, updateUserPasswordSaga);
}

export function* watchDeleteUserSaga() {
  yield takeLatest(sagaTypes.DELETE_USER_SAGA, deleteUserSaga);
}

export function* watchUpdateUserAvatarSaga() {
  yield takeLatest(sagaTypes.UPDATE_USER_AVATAR_SAGA, updateUserAvatarSaga);
}
