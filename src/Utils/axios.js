import axios from "axios";

const API = axios.create({
  baseURL: "https://node-crud-3.onrender.com",
});

// export const request = ({ method, url, data, token }) => {
//   const headers = {};
//   if (token) {
//     headers.Authorization = `Bearer ${token}`;
//   }

//   const config = {
//     method,
//     url,
//     headers,
//     data,
//   };

//   return API(config)
//     .then((response) => response.data)
//     .catch((error) => {
//       throw error;
//     });
// };

// axios.defaults.baseURL=`https://node-crud-3.onrender.com`;
// axios.defaults.headers.post['auth']='dadadafsfgjsngfwsnwgswvw'
// axios.defaults.headers.get['viren']='jswbcasbadkbxcjbxkjfukwh'

// axios.interceptors.request.




// API.interceptors.request.use(
//   function (config) {
//     // console.log('CONFIG IN API REQUEST',config);
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// API.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

export default API;
