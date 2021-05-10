import {
  FETCH_CONTROLLER_BEGIN,
  FETCH_CONTROLLER_SUCCESS,
  FETCH_CONTROLLER_FAIL,
} from "./types";
import { setMessage } from "./message";
import dataService from "../services/data.service";

export const fetchControllerBegin = () => ({
  type: FETCH_CONTROLLER_BEGIN,
});

export const fetchControllerSuccess = (payload) => ({
  type: FETCH_CONTROLLER_SUCCESS,
  payload,
});

export const fetchControllerFail = (payload) => ({
  type: FETCH_CONTROLLER_FAIL,
  payload,
});

export const getController = (url) => (dispatch) => {
  dispatch(fetchControllerBegin());
  return dataService.getData(url).then(
    (response) => {
      dispatch(fetchControllerSuccess(response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchControllerFail(message));
      dispatch(setMessage(message));
      return Promise.reject();
    }
  );
};
