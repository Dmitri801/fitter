import { combineReducers } from "redux";
import authReducer from "./auth";
import userReducer from "./users";
import { reducer as formReducer } from "redux-form";
export default combineReducers({
  auth: authReducer,
  users: userReducer,
  form: formReducer
});
