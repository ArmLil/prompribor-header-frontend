import { SET_MESSAGE, CLEAR_MESSAGE, GET_DATA_FAIL } from "./types";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});
