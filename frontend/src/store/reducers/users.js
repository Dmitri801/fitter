import { GET_AUTHED_USER } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_AUTHED_USER:
      return {
        ...state,
        authedUser: action.payload
      };
    default:
      return state;
  }
}
