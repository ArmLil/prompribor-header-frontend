import {
  FETCH_COMMCENTERS_BEGIN,
  FETCH_COMMCENTERS_SUCCESS,
  FETCH_COMMCENTERS_FAIL,
} from "./types";
import dataService from "../services/data.service";

export const fetchCommCentersBegin = () => ({
  type: FETCH_COMMCENTERS_BEGIN,
});

export const fetchCommCentersSuccess = (payload) => ({
  type: FETCH_COMMCENTERS_SUCCESS,
  payload,
});

export const fetchCommCentersFail = (payload) => ({
  type: FETCH_COMMCENTERS_FAIL,
  payload,
});

export const getCommCenters = (url) => (dispatch) => {
  dispatch(fetchCommCentersBegin());
  return dataService.getData(url).then(
    (response) => {
      if (response.message) {
        throw Error(response.massage);
      }
      dispatch(fetchCommCentersSuccess(response.data));
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchCommCentersFail(message));
      // return Promise.reject();
    }
  );
};
