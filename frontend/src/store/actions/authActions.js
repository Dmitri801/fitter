import { AUTH_USER, AUTH_ERROR, CLEAR_ERROR } from "./types";
import axios from "axios";

export const registerUser = (
  { firstName, lastName, email, password, confirmPassword, goals },
  callback
) => {
  return async function(dispatch) {
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      goals,
      confirmPassword
    };
    try {
      const response = await axios.post(
        "http://localhost:3030/api/users/register",
        newUser
      );
      console.log(response.data);
      dispatch({
        type: AUTH_USER,
        payload: response.data.token,
        id: response.data.user._id
      });
      dispatch({ type: CLEAR_ERROR });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("ID", response.data.user._id);
      callback();
    } catch (err) {
      if (Object.keys(err.response.data).length > 1) {
        dispatch({
          type: AUTH_ERROR,
          message: "Make sure all fields are filled out correctly",
          errors: err.response.data
        });
      } else if (err.response.data.message) {
        dispatch({
          type: AUTH_ERROR,
          message: err.response.data.message,
          errors: err.response.data
        });
      } else {
        dispatch({
          type: AUTH_ERROR,
          message: err.response.data[Object.keys(err.response.data)[0]],
          errors: err.response.data
        });
      }
    }
  };
};

export const signInUser = (formProps, callback) => {
  return async function(dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3030/api/users/login",
        formProps
      );

      dispatch({
        type: AUTH_USER,
        payload: response.data.token,
        id: response.data.user._id
      });
      dispatch({ type: CLEAR_ERROR });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("ID", response.data.user._id);
      callback();
    } catch (err) {
      if (Object.keys(err.response.data).length > 1) {
        dispatch({
          type: AUTH_ERROR,
          message: `${err.response.data.email} /
          ${err.response.data.password}`,
          errors: err.response.data
        });
      } else if (err.response.data.email) {
        dispatch({
          type: AUTH_ERROR,
          message: err.response.data.email,
          errors: err.response.data
        });
      } else {
        dispatch({
          type: AUTH_ERROR,
          message: err.response.data.password,
          errors: err.response.data
        });
      }
    }
  };
};

export const signOutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("ID");
  return {
    type: AUTH_USER,
    payload: ""
  };
};

export const clearError = () => {
  return {
    type: CLEAR_ERROR
  };
};
