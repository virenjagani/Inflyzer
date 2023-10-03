//redux/saga/handler/user.js

import { call, put } from "redux-saga/effects";
import {
  requestAddUpdatedUser,
  requestAddUserDetails,
  requestDeleteUserDetails,
  requestGetUserList,
  requestLoginUser,
  requestRegisterUser,
  requestSearchUserList,
  requestUserObject,
} from "../request/user";
import {
  failRequest,
  makeRequest,
  setAddDetails,
  setAddUserDetailForUpdate,
  setDeleteDetails,
  setLogin,
  setLogout,
  setRegisterDetail,
  setSearchedUserList,
  setUser,
  setUserObject,
} from "../../ducks/userReducer";

export function* fetchUserList() {
  try {
    yield put(makeRequest());
    const response = yield call(requestGetUserList);
    yield put(setUser(response.data.details));
  } catch (error) {
    yield put(failRequest(error.message));
  }
}

export function* fetchAddDetails({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestAddUserDetails, payload);
    yield put(setAddDetails(response?.data?.message));
  } catch (error) {
    yield put(failRequest(error?.response?.data?.message));
  }
}

export function* fetchDeleteDetails({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestDeleteUserDetails, payload);
    yield put(setDeleteDetails(response?.data?.message));
    yield fetchUserList();
  } catch (error) {
    yield put(failRequest(error?.response?.data?.message));
  }
}

export function* fetchUserObject({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestUserObject, payload);
    yield put(setUserObject(response.data?.details));
  } catch (error) {
    yield put(failRequest(error.message));
  }
}

export function* fetchAddUserForUpdate({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestAddUpdatedUser, payload);
    yield put(setAddUserDetailForUpdate(response.data.message));
  } catch (error) {
    yield put(failRequest(error.message));
  }
}

export function* fetchRegisterDetails({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestRegisterUser, payload);
    if (response.status == 201) {
      yield put(setRegisterDetail(response?.data?.message));
    }
  } catch (error) {
    if (error.response.status === 409) {
      yield put(failRequest(error?.response?.data?.message));
    }
  }
}

export function* fetchLoginUser({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestLoginUser, payload);
    const value = { status: response.data.status, token: response.data.token };
    yield put(setLogin(value));
  } catch (error) {
    yield put(
      failRequest(
        error.response?.data?.message || "Network issue... Try after somtime."
      )
    );
  }
}

export function* fetchSearchedUserList({ payload }) {
  try {
    yield put(makeRequest());
    const response = yield call(requestGetUserList);
    const filteredUsersData = response.data.details.filter((f) =>
      f.title.toLowerCase().includes(payload)
    );
    if (payload !== null) {
      if (filteredUsersData !== null) {
        yield put(setSearchedUserList(filteredUsersData));
      } else {
        yield put(setUser(response.data.details));
      }
    } else {
      yield put(setSearchedUserList(response.data.details));
    }
  } catch (error) {
    yield put(failRequest(error.message));
  }
}
