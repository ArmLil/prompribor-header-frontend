import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from "./types";
import { setMessage } from "./message";
import dataService from "../services/data.service";

export const fetchDataBegin = () => ({
  type: FETCH_DATA_BEGIN,
});

export const fetchDataSuccess = (payload) => ({
  type: FETCH_DATA_SUCCESS,
  payload,
});

export const fetchDataFail = (payload) => ({
  type: FETCH_DATA_FAIL,
  payload,
});

export const getData = (url) => (dispatch) => {
  dispatch(fetchDataBegin());
  return dataService.getData(url).then(
    (response) => {
      dispatch(fetchDataSuccess(response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchDataFail(message));
      dispatch(setMessage(message));
      return Promise.reject();
    }
  );
};
