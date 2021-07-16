import {
  FETCH_CONTROLLERS_FOR_COMMCENTER_BEGIN,
  FETCH_CONTROLLERS_FOR_COMMCENTER_SUCCESS,
  FETCH_CONTROLLERS_FOR_COMMCENTER_FAIL,
  SOCKET_UPDATE_CONTROLLER,
} from "./types";
import dataService from "../services/data.service";

export const fetchControllersForCommCenterBegin = () => ({
  type: FETCH_CONTROLLERS_FOR_COMMCENTER_BEGIN,
});

export const fetchControllersForCommCenterSuccess = (payload) => ({
  type: FETCH_CONTROLLERS_FOR_COMMCENTER_SUCCESS,
  payload,
});

export const fetchControllersForCommCenterFail = (payload) => ({
  type: FETCH_CONTROLLERS_FOR_COMMCENTER_FAIL,
  payload,
});

export const socketUpdateController = (payload) => ({
  type: SOCKET_UPDATE_CONTROLLER,
  payload,
});

export const getControllersForCommCenter = (url) => (dispatch) => {
  dispatch(fetchControllersForCommCenterBegin());
  return dataService.getData(url).then(
    (response) => {
      dispatch(fetchControllersForCommCenterSuccess(response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchControllersForCommCenterFail(message));
      return Promise.reject();
    }
  );
};

export const updateControllerBySocket = (
  controllers,
  registerControllerValue
) => (dispatch) => {
  let newControllers = [];
  controllers.forEach((controller, i) => {
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
      newControllers.push(newController);
      if (regValue !== regContrValue)
        dispatch(socketUpdateController(newControllers));
    }
  });
};
