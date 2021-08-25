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

export const getCurrentCommCenter = (url) => (dispatch) => {
  dispatch(fetchCurrentCommCenterBegin());
  return dataService.getData(url).then(
    (response) => {
      if (response.message) {
        throw Error(response.massage);
      }
      console.log("response.data====", response.data);
      dispatch(fetchCurrentCommCenterSuccess(response.data));
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

      dispatch(fetchCurrentCommCenterFail(message));
      // return Promise.reject();
    }
  );
};

export const addJournalData = (commCenter, journalName, journalData) => (
  dispatch
) => {
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

  dispatch(updateCurrentCommCenter(newCommCenter));
};

export const editJournalData = (commCenter, journalName, journalData) => (
  dispatch
) => {
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
    let newFuel_journal_data = newCommCenter.fuel_journal_data.map((row, i) => {
      if (row.id === journalData.id) {
        return journalData;
      } else return row;
    });
    newCommCenter.fuel_journal_data = newFuel_journal_data;
  }
  dispatch(updateCurrentCommCenter(newCommCenter));
};

export const deleteJournalData = (commCenter, journalName, dataId) => (
  dispatch
) => {
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

  dispatch(updateCurrentCommCenter(newCommCenter));
};
