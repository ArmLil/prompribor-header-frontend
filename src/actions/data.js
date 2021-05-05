import { FETCH_DATA_BEGIN, FETCH_DATA_SUCCESS, FETCH_DATA_FAIL } from "./types";

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
