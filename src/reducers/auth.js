import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, bodyPhone: "", user }
  : { isLoggedIn: false, bodyPhone: "bodyPhone", user: null };

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        bodyPhone: "bodyPhone",
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        bodyPhone: "bodyPhone",
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        bodyPhone: "",
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        bodyPhone: "bodyPhone",
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        bodyPhone: "bodyPhone",
      };
    default:
      return state;
  }
}
