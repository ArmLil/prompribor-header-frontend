import { SET_ALERT, CLOSE_ALERT } from "./types";

export const setAlert = (value) => ({
  type: SET_ALERT,
  payload: value,
});

export const closeAlert = () => ({
  type: CLOSE_ALERT,
});

export const showAlert = (payload) => (dispatch) => {
  dispatch(setAlert(payload));
  setTimeout(() => {
    dispatch(closeAlert());
  }, 5000);
};
