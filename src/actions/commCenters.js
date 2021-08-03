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
      console.log("response.data====", response.data);
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
      if (journalName === "fuel") {
        newCommCenter.fuel_journal_data.push(journalData);
      }
      newCommCenters.push(newCommCenter);
    } else {
      newCommCenters.push(commCenter);
    }
  });
  dispatch(updateCommCenters(newCommCenters));
};

export const editJournalData = (
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
        let newAvarii_journal_data = newCommCenter.avarii_journal_data.map(
          (row, i) => {
            if (row.id === journalData.id) {
              return journalData;
            } else return row;
          }
        );
        newCommCenter.avarii_journal_data = newAvarii_journal_data;
      }
      if (journalName === "donesenii") {
        let newDonesenii_journal_data = newCommCenter.donesenii_journal_data.map(
          (row, i) => {
            if (row.id === journalData.id) {
              return journalData;
            } else return row;
          }
        );
        newCommCenter.donesenii_journal_data = newDonesenii_journal_data;
      }
      if (journalName === "nasosi") {
        let newNasosi_journal_data = newCommCenter.nasosi_journal_data.map(
          (row, i) => {
            if (row.id === journalData.id) {
              return journalData;
            } else return row;
          }
        );
        newCommCenter.nasosi_journal_data = newNasosi_journal_data;
      }
      if (journalName === "fuel") {
        let newFuel_journal_data = newCommCenter.fuel_journal_data.map(
          (row, i) => {
            if (row.id === journalData.id) {
              return journalData;
            } else return row;
          }
        );
        newCommCenter.fuel_journal_data = newFuel_journal_data;
      }
      newCommCenters.push(newCommCenter);
    } else {
      newCommCenters.push(commCenter);
    }
  });
  dispatch(updateCommCenters(newCommCenters));
};

export const deleteJournalData = (
  commCenters,
  commCenterPath,
  journalName,
  dataId
) => (dispatch) => {
  let newCommCenters = [];
  commCenters.forEach((commCenter, i) => {
    if (commCenter.path && commCenter.path === commCenterPath) {
      let newCommCenter = Object.assign({}, commCenter);
      if (journalName === "avarii") {
        let newAvarii_journal_data = newCommCenter.avarii_journal_data.filter(
          (row, i) => row.id !== dataId
        );
        newCommCenter.avarii_journal_data = newAvarii_journal_data;
      }
      if (journalName === "donesenii") {
        let newDonesenii_journal_data = newCommCenter.donesenii_journal_data.filter(
          (row, i) => row.id !== dataId
        );
        newCommCenter.donesenii_journal_data = newDonesenii_journal_data;
      }
      if (journalName === "nasosi") {
        let newNasosi_journal_data = newCommCenter.nasosi_journal_data.filter(
          (row, i) => row.id !== dataId
        );
        newCommCenter.nasosi_journal_data = newNasosi_journal_data;
      }
      if (journalName === "fuel") {
        let newFuel_journal_data = newCommCenter.fuel_journal_data.filter(
          (row, i) => row.id !== dataId
        );
        newCommCenter.fuel_journal_data = newFuel_journal_data;
      }
      newCommCenters.push(newCommCenter);
    } else {
      newCommCenters.push(commCenter);
    }
  });
  dispatch(updateCommCenters(newCommCenters));
};
