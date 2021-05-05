import { fetchDataBegin, fetchDataSuccess, fetchDataFail } from "./data";
import { setMessage } from "./message";
import CommCentersService from "../services/commCenters.service";

export const getCommCenters = () => (dispatch) => {
  dispatch(fetchDataBegin());
  return CommCentersService.getCommCenters().then(
    (response) => {
      dispatch(fetchDataSuccess(response.data));
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchDataFail(message));
      dispatch(setMessage(message));
    }
  );
};
