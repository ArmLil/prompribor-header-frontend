import {
  FETCH_CONTROLLER_BEGIN,
  FETCH_CONTROLLER_SUCCESS,
  FETCH_CONTROLLER_FAIL,
  SOCKET_UPDATE_CONTROLLER,
} from "./types";
import { setMessage } from "./message";
import dataService from "../services/data.service";

export const fetchControllerBegin = () => ({
  type: FETCH_CONTROLLER_BEGIN,
});

export const fetchControllerSuccess = (payload) => ({
  type: FETCH_CONTROLLER_SUCCESS,
  payload,
});

export const fetchControllerFail = (payload) => ({
  type: FETCH_CONTROLLER_FAIL,
  payload,
});

export const socketUpdateController = (payload) => ({
  type: SOCKET_UPDATE_CONTROLLER,
  payload,
});

export const getController = (url) => (dispatch) => {
  dispatch(fetchControllerBegin());
  return dataService.getData(url).then(
    (response) => {
      dispatch(fetchControllerSuccess(response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchControllerFail(message));
      dispatch(setMessage(message));
      return Promise.reject();
    }
  );
};

export const updateControllerBySocket = (
  controller,
  registerControllerValue
) => (dispatch) => {
  if (controller.registersGroups && controller.registersGroups.length > 0) {
    let newController = Object.assign({}, controller);
    let regValue = "";
    let regContrValue = "";

    newController.registersGroups.forEach((gr, i) => {
      if (gr.registers && gr.registers.length > 0) {
        gr.registers.forEach((reg, i) => {
          if (
            reg.address === registerControllerValue.registerAddress &&
            reg.value !== registerControllerValue.value
          ) {
            regValue = reg.value;
            regContrValue = registerControllerValue.value;
            reg.value = registerControllerValue.value;
          }
        });
      }
    });
    if (regValue !== regContrValue)
      dispatch(socketUpdateController(newController));
  }
};
