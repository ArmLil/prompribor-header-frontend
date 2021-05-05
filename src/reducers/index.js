import { combineReducers } from "redux";
import authReducer from "./auth";
import message from "./message";
import commCentersReducer from "./commCenters";

export default combineReducers({
  authReducer,
  message,
  commCentersReducer,
});
