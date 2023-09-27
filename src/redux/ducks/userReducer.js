//redux/ducks/userReducer.js

import { Switch } from "react-router-dom";
import { retry } from "redux-saga/effects";

export const GET_USER = "GET_USER";
export const SET_USER = "SET_USER";
export const FAIL_REQUEST = "FAIL_REQUEST";
export const MAKE_REQUEST = "MAKE_REQUEST";
export const GET_ADD_DETAILS = "GET_ADD_DETAILS";
export const SET_ADD_DETAILS = "SET_ADD_DETAILS";
export const GET_DELETE_DETAILS = "GET_DELETE_DETAILS";
export const SET_DELETE_DETAILS = "SET_DELETE_DETAILS";
export const GET_USER_OBJECT = "GET_USER_OBJECT";
export const SET_USER_OBJECT = "SET_USER_OBJECT";
export const GET_ADD_USER_DATA_UPDATE = "GET_ADD_USER_DATA_UPDATE";
export const SET_ADD_USER_DATA_UPDATE = "SET_ADD_USER_DATA_UPDATE";
export const GET_REGISTER_DETAIL = "GET_REGISTER_DETAIL";
export const SET_REGISTER_DETAIL = "SET_REGISTER_DETAIL";
export const GET_LOGIN_DETAIL = "GET_LOGIN_DETAIL";
export const SET_LOGIN_DETAIL = "SET_LOGIN_DETAIL";
export const GET_LOGOUT = "GET_LOGOUT";
export const SET_LOGOUT = "SET_LOGOUT";
export const NULL_ERROR = "NULL_ERROR";
export const GET_SEARCHED_USERLIST = "GET_SEARCHED_USERLIST";
export const SET_SEARCHED_USERLIST = "SET_SEARCHED_USERLIST";

export const SORT_DATA = "SORT_DATA";

export const sortData = (value,col,order) => {
  return {
    type: SORT_DATA,
    payload: {value,col,order}
  };
};

export const getUser = () => {
  return {
    type: GET_USER,
  };
};

export const setUser = (value) => {
  return {
    type: SET_USER,
    payload: value,
  };
};

export const failRequest = (error) => {
  return {
    type: FAIL_REQUEST,
    payload: error,
  };
};

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

export const getAddDetails = (value) => {
  return {
    type: GET_ADD_DETAILS,
    payload: value,
  };
};

export const setAddDetails = (value) => {
  return {
    type: SET_ADD_DETAILS,
    payload: value,
  };
};

export const getDeleteDetails = (id) => {
  return {
    type: GET_DELETE_DETAILS,
    payload: id,
  };
};

export const setDeleteDetails = (message) => {
  return {
    type: SET_DELETE_DETAILS,
    payload: message,
  };
};

export const getUserObject = (id) => {
  return {
    type: GET_USER_OBJECT,
    payload: id,
  };
};

export const setUserObject = (value) => {
  return {
    type: SET_USER_OBJECT,
    payload: value,
  };
};

export const addUserDetailForUpdate = (value) => {
  return {
    type: GET_ADD_USER_DATA_UPDATE,
    payload: value,
  };
};

export const setAddUserDetailForUpdate = (value) => {
  return {
    type: SET_ADD_USER_DATA_UPDATE,
    payload: value,
  };
};

export const getRegisterDetail = (value) => {
  return {
    type: GET_REGISTER_DETAIL,
    payload: value,
  };
};

export const setRegisterDetail = (value) => {
  return {
    type: SET_REGISTER_DETAIL,
    payload: value,
  };
};

export const getLogin = (value) => {
  return {
    type: GET_LOGIN_DETAIL,
    payload: value,
  };
};
export const setLogin = (value) => {
  return {
    type: SET_LOGIN_DETAIL,
    payload: value,
  };
};

export const getLogout = () => {
  return {
    type: GET_LOGOUT,
  };
};
export const setLogout = () => {
  return {
    type: SET_LOGOUT,
  };
};

export const nullError = () => {
  return {
    type: NULL_ERROR,
  };
};

export const getSearchedUserList = (value) => {
  return {
    type: GET_SEARCHED_USERLIST,
    payload: value,
  };
};
export const setSearchedUserList = (users) => {
  return {
    type: SET_SEARCHED_USERLIST,
    payload: users,
  };
};

const initialState = {
  userList: null,
  userObject: null,
  message: null,
  error: null,
  loading: null,
  token: null,
};
const initialAuthState = {
  message: null,
  error: null,
  loading: null,
  token: null,
};
export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        message: null,
        error: action.payload,
        loading: false,
      };
    case SET_REGISTER_DETAIL:
      return {
        ...state,
        message: action.payload,
        error: null,
        loading: false,
      };
    case SET_LOGIN_DETAIL:
      return {
        ...state,
        message: action.payload.status,
        token: action.payload?.token,
        error: null,
        loading: false,
      };
    case GET_LOGOUT:
      return {
        ...state,
        token: null,
        error: null,
        loading: false,
      };
    case NULL_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        message: null,
        error: action.payload,
        loading: false,
      };
    case SET_USER:
      return {
        ...state,
        userList: action.payload,
        error: null,
        message: null,
        loading: false,
      };
    case SET_ADD_DETAILS:
      return {
        ...state,
        message: action.payload,
        error: null,
        loading: false,
      };
    case SET_DELETE_DETAILS:
      return {
        ...state,
        message: action.payload,
        error: null,
        loading: false,
      };
    case SET_USER_OBJECT:
      return {
        ...state,
        userObject: action.payload,
        error: null,
        loading: false,
      };
    case SET_ADD_USER_DATA_UPDATE:
      return {
        ...state,
        message: action.payload,
        error: null,
        loading: false,
      };
    case NULL_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_SEARCHED_USERLIST:
      return {
        ...state,
        userList: action.payload,
        loading: false,

      };
    case SORT_DATA:
      let sortedData
      if (action.payload.order === "ASC") {
        sortedData = [...action.payload.value].sort((a, b) => {
          return a[action.payload.col].toLowerCase() > b[action.payload.col].toLowerCase() ? 1 : -1;
        });
      }
      if (action.payload.order === "DSC") {
       sortedData = [...action.payload.value].sort((a, b) => {
          return a[action.payload.col].toLowerCase() < b[action.payload.col].toLowerCase() ? 1 : -1;
        });
      }

      return {
        ...state,
        userList: sortedData,
      };
    default:
      return state;
  }
};
