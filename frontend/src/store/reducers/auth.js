import { AUTH_USER, AUTH_ERROR, CLEAR_ERROR } from "../actions/types";

const initialState = {
  authenticated: "",
  id: "",
  errorMessage: "",
  errors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload,
        id: action.id
      };
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.message,
        errors: action.errors
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errorMessage: "",
        errors: {}
      };
    default:
      return state;
  }
}
