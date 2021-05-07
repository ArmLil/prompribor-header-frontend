import { combineReducers } from "redux";
import authReducer from "./auth";
import message from "./message";
import commCentersReducer from "./commCenters";
import controllerReducer from "./controller";

export default combineReducers({
  authReducer,
  message,
  commCentersReducer,
  controllerReducer,
});
