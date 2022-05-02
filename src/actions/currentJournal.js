import { SET_CURRENTJOURNAL } from "./types";

export const setCurrentJournal = (payload) => ({
  type: SET_CURRENTJOURNAL,
  payload: payload,
});
