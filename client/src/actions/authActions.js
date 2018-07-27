import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./type";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";


//Login - Get User Token
export const loginUser = userData => dispatch => {
  //axios call
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;

      //Set token to local storage
      localStorage.setItem("jwtToken", token);

      //Set token to Auth header
      setAuthToken(token);

      //Decode token to get user data
      const decoded = jwt_decode(token);

      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//Set logged in user
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");

  //Remove auth header for future requests
  setAuthToken(false);

  //Set Current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
