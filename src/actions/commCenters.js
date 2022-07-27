import {
  FETCH_COMMCENTERS_BEGIN,
  FETCH_COMMCENTERS_SUCCESS,
  FETCH_COMMCENTERS_FAIL,
  UPDATE_COMMCENTERS,
} from "./types";
import dataService from "../services/data.service";
import { updateCurrentCommCenter } from "./currentCommCenter";
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

export const updateCommCenters = (payload) => ({
  type: UPDATE_COMMCENTERS,
  payload,
});

export const getCommCenters = (url) => (dispatch) => {
  console.log(url);
  dispatch(fetchCommCentersBegin());
  return dataService.getData(url).then(
    (response) => {
      dispatch(fetchCommCentersSuccess(response.data));
      return Promise.resolve();
    },
    (error) => {
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

export const addJournalData = (
  currentCommCenter,
  currentJournal,
  journalName,
  journalData
) => (dispatch) => {
  const searchParams = new URLSearchParams(window.location.search);
  let queryLimit = +searchParams.get("limit");
  if (
    currentJournal === journalName &&
    journalData.commCenterId === currentCommCenter.id &&
    window.location.pathname.includes("journals") &&
    currentCommCenter[journalName].rows.length < queryLimit
  ) {
    let newCommCenter = Object.assign({}, currentCommCenter);
    newCommCenter[journalName].rows.push(journalData);
    dispatch(updateCurrentCommCenter(newCommCenter));
  }
};
