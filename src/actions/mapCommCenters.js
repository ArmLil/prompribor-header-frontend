import {
  FETCH_MAP_COMMCENTERS_BEGIN,
  FETCH_MAP_COMMCENTERS_SUCCESS,
  FETCH_MAP_COMMCENTERS_FAIL,
  UPDATE_MAP_COMMCENTERS,
} from "./types";
import dataService from "../services/data.service";

export const fetchMapCommCentersBegin = () => ({
  type: FETCH_MAP_COMMCENTERS_BEGIN,
});

export const fetchMapCommCentersSuccess = (payload) => ({
  type: FETCH_MAP_COMMCENTERS_SUCCESS,
  payload,
});

export const fetchMapCommCentersFail = (payload) => ({
  type: FETCH_MAP_COMMCENTERS_FAIL,
  payload,
});

export const socketUpdateMapCommCenters = (payload) => ({
  type: UPDATE_MAP_COMMCENTERS,
  payload,
});

export const getMapCommCenters = (url) => (dispatch) => {
  dispatch(fetchMapCommCentersBegin());
  return dataService.getData(url).then(
    (response) => {
      dispatch(fetchMapCommCentersSuccess(response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchMapCommCentersFail(message));
      // return Promise.reject();
    }
  );
};

export const updateMapCommCentersBySocket = (mapCommCenters) => (dispatch) => {
  console.log({ mapCommCenters });
  dispatch(socketUpdateMapCommCenters(mapCommCenters));
};
