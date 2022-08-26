import {
  FETCH_CURRENT_COMMCENTER_BEGIN,
  FETCH_CURRENT_COMMCENTER_SUCCESS,
  FETCH_CURRENT_COMMCENTER_FAIL,
  UPDATE_CURRENT_COMMCENTER,
} from "./types";
import dataService from "../services/data.service";

export const fetchCurrentCommCenterBegin = () => ({
  type: FETCH_CURRENT_COMMCENTER_BEGIN,
});

export const fetchCurrentCommCenterSuccess = (payload) => ({
  type: FETCH_CURRENT_COMMCENTER_SUCCESS,
  payload,
});

export const fetchCurrentCommCenterFail = (payload) => ({
  type: FETCH_CURRENT_COMMCENTER_FAIL,
  payload,
});

export const updateCurrentCommCenter = (payload) => ({
  type: UPDATE_CURRENT_COMMCENTER,
  payload,
});

export const getCurrentCommCenter = (url, reduserCommcenter) => (dispatch) => {
  dispatch(fetchCurrentCommCenterBegin());
  return dataService
    .getData(url)
    .then((response) => {
      if (response.message) {
        throw Error(response.massage);
      }
      let newCommCenter = Object.assign({}, reduserCommcenter, response.data);
      dispatch(fetchCurrentCommCenterSuccess(newCommCenter));
    })
    .catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchCurrentCommCenterFail(message.toString()));
    });
};
