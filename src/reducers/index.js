import { combineReducers } from "redux";
import authReducer from "./auth";
import message from "./message";
import mapCommCentersReducer from "./mapCommCenters";
import commCentersReducer from "./commCenters";
import commCenterMonitoringReducer from "./commCenterMonitoring";
import currentCommCenterReducer from "./currentCommCenter";
import currentJournalReducer from "./currentJournal";

export default combineReducers({
  authReducer,
  message,
  mapCommCentersReducer,
  commCentersReducer,
  commCenterMonitoringReducer,
  currentCommCenterReducer,
  currentJournalReducer,
});
