//redux/saga/request/user.js

import axios from "axios";
import API, { request } from "../../../Utils/axios";

axios.defaults.baseURL = `https://node-crud-3.onrender.com`;

export function requestGetUserList() {
  const response = axios.get(`/allpost`);
  return response;
}

export async function requestAddUserDetails(payload) {
  const response = await axios.post(`/addpost`, payload, {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmQ5MDU5OTFlNzI1MmNkNDBhMTk1NCIsImlhdCI6MTY5NDMzOTIwOSwiZXhwIjoxNjk2OTMxMjA5fQ.oDS6yzETvUTu7ul2QOLZ3hxkfSIOWyzjvvMxz-uC4JQ`,
    },
  });
  return response;
}

export function requestDeleteUserDetails(id) {
  const response = axios.delete(`/deletepost/` + id, {
    headers: {
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmIyMDQ2Njg4YjBkZGJhOWQ5YmZkZCIsImlhdCI6MTY5NDMzMjAzNywiZXhwIjoxNjk2OTI0MDM3fQ.b_erlVIytNkNmwp7fDKY2xmfSds8rQaa3kieDEIp9nc`,
    },
  });
  return response;
}

export function requestUserObject(id) {
  const response = axios.get(`/getpost/` + id, {
    headers: {
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmIyMDQ2Njg4YjBkZGJhOWQ5YmZkZCIsImlhdCI6MTY5NDMzMDk0MSwiZXhwIjoxNjk2OTIyOTQxfQ.h8_mRCe99oudJVkRkTrt_HOHz4WmCY9IJExrzstx-vA`,
    },
  });
  return response;
}

export function requestAddUpdatedUser({ values, id }) {
  const bodyValuesToPut = {
    title: values.title,
    description: values.description,
  };
  const response = axios.put(`/updatepost/` + id, bodyValuesToPut, {
    headers: {
      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmQ5MDU5OTFlNzI1MmNkNDBhMTk1NCIsImlhdCI6MTY5NDMzOTIwOSwiZXhwIjoxNjk2OTMxMjA5fQ.oDS6yzETvUTu7ul2QOLZ3hxkfSIOWyzjvvMxz-uC4JQ`,
    },
  });
  return response;
}

export function requestRegisterUser(value) {
  const response = axios.post(`/register`, value);
  return response;
}

export function requestLoginUser(value) {
  const response = axios.post(`/login`, value, {
    headers: {
      Authorization: `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`,
    },
  });
  return response;
}

// export function requestSearchUserList(value){
//   const response =axios.get(`https://node-crud-3.onrender.com/allpost`)
// }