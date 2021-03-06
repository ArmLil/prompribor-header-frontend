import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";

const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

const registerFail = () => ({
  type: REGISTER_FAIL,
});

const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: { user: data },
});

const loginFail = () => ({
  type: LOGIN_FAIL,
});

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      dispatch(registerSuccess());
      dispatch(setMessage(response.data.message));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(registerFail);
      dispatch(setMessage(message));

      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch(loginSuccess(data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(loginFail());
      dispatch(setMessage(message));

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  console.log("action/logout");
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
