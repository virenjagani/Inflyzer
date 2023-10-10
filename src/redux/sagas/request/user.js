//redux/saga/request/user.js

import axios from "axios";
import Axios from "../../../Utils/axios";

// Axios.defaults.baseURL = `https://node-crud-3.onrender.com`;

export function requestGetUserList() {
  const response = Axios.get(`/allpost`);
  return response;
}

export async function requestAddUserDetails(payload) {
  const response = await Axios.post(`/addpost`, payload);
  return response;
}

export function requestDeleteUserDetails(id) {
  const response = Axios.delete(`/deletepost/` + id);
  return response;
}

export function requestUserObject(id) {
  const response = Axios.get(`/getpost/` + id);
  return response;
}

export function requestAddUpdatedUser({ values, id }) {
  const bodyValuesToPut = {
    title: values.title,
    description: values.description,
  };
  const response = Axios.put(`/updatepost/` + id, bodyValuesToPut);
  return response;
}

export function requestRegisterUser(value) {
  const response = Axios.post(`/register`, value);
  return response;
}

export function requestLoginUser(value) {
  const response = Axios.post(`/login`, value);
  return response;
}

// export function requestSearchUserList(value){
//   const response =Axios.get(`https://node-crud-3.onrender.com/allpost`)
// }
