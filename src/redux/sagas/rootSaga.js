//redux/saga/rootSaga.js

import {
  GET_ADD_DETAILS,
  GET_ADD_USER_DATA_UPDATE,
  GET_DELETE_DETAILS,
  GET_LOGIN_DETAIL,
  GET_LOGOUT,
  GET_REGISTER_DETAIL,
  GET_SEARCHED_USERLIST,
  GET_USER,
  GET_USER_OBJECT,
} from "../ducks/userReducer";
import { takeLatest } from "redux-saga/effects";
import {
  fetchAddDetails,
  fetchAddUserForUpdate,
  fetchDeleteDetails,
  fetchLoginUser,
  fetchLogout,
  fetchRegisterDetails,
  fetchSearchedUserList,
  fetchUserList,
  fetchUserObject,
} from "./handler/user";

export function* watcherSaga() {
  yield takeLatest(GET_USER, fetchUserList);
  yield takeLatest(GET_ADD_DETAILS, fetchAddDetails);
  yield takeLatest(GET_DELETE_DETAILS, fetchDeleteDetails);
  yield takeLatest(GET_USER_OBJECT, fetchUserObject);
  yield takeLatest(GET_ADD_USER_DATA_UPDATE, fetchAddUserForUpdate);
  yield takeLatest(GET_REGISTER_DETAIL,fetchRegisterDetails)
  yield takeLatest(GET_LOGIN_DETAIL,fetchLoginUser)
  yield takeLatest(GET_SEARCHED_USERLIST,fetchSearchedUserList)
}
