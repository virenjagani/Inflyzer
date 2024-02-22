import { store } from "../redux/store";


function authToken() {
  if (store.getState().auth.token) {
    // return takon with auth
    return store.getState().auth.token;
  }
  
  return null;
}

export default authToken;
