import {
  FETCH_COMMCENTERS_BEGIN,
  FETCH_COMMCENTERS_SUCCESS,
  FETCH_COMMCENTERS_FAIL,
  UPDATE_COMMCENTERS,
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

export const updateCommCenters = (payload) => ({
  type: UPDATE_COMMCENTERS,
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

export const addJournalData = (
  commCenters,
  commCenterPath,
  journalName,
  journalData
) => (dispatch) => {
  let newCommCenters = [];
  commCenters.forEach((commCenter, i) => {
    if (commCenter.path && commCenter.path === commCenterPath) {
      let newCommCenter = Object.assign({}, commCenter);
      if (journalName === "avarii") {
        newCommCenter.avarii_journal_data.push(journalData);
      }
      if (journalName === "donesenii") {
        newCommCenter.donesenii_journal_data.push(journalData);
      }
      if (journalName === "nasosi") {
        newCommCenter.nasosi_journal_data.push(journalData);
      }
      newCommCenters.push(newCommCenter);
    } else {
      newCommCenters.push(commCenter);
    }
  });
  console.log({ newCommCenters });
  dispatch(updateCommCenters(newCommCenters));
};
