import { GET_AUTHED_USER } from "./types";
import axios from "axios";
export const getAuthedUser = (token, id) => async dispatch => {
  try {
    const url = `http://localhost:3030/api/users/${id}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const userData = {
      firstName: response.data.firstName,
      lastName: response.data.lastName,
      email: response.data.email,
      goals: response.data.goals,
      id: response.data._id
    };
    dispatch({
      type: GET_AUTHED_USER,
      payload: userData
    });
  } catch (err) {
    console.log(err.response);
  }
};
