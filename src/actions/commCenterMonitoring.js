import {
  FETCH_COMMCENTER_MONITORING_BEGIN,
  FETCH_COMMCENTER_MONITORING_SUCCESS,
  FETCH_COMMCENTER_MONITORING_FAIL,
  SOCKET_UPDATE_COMMCENTER_MONITORING,
} from "./types";
import dataService from "../services/data.service";

export const fetchCommCenterMonitoringBegin = () => ({
  type: FETCH_COMMCENTER_MONITORING_BEGIN,
});

export const fetchCommCenterMonitoringSuccess = (payload) => ({
  type: FETCH_COMMCENTER_MONITORING_SUCCESS,
  payload,
});

export const fetchCommCenterMonitoringFail = (payload) => ({
  type: FETCH_COMMCENTER_MONITORING_FAIL,
  payload,
});

export const socketUpdateCommCenterMonitoring = (payload) => ({
  type: SOCKET_UPDATE_COMMCENTER_MONITORING,
  payload,
});

export const getCommCenterMonitoring = (url) => (dispatch) => {
  dispatch(fetchCommCenterMonitoringBegin());
  return dataService.getData(url).then(
    (response) => {
      dispatch(fetchCommCenterMonitoringSuccess(response.data));
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(fetchCommCenterMonitoringFail(message));
    }
  );
};

export const updateCommCenterMonitoringBySocket = (
  commCenterMonitoring,
  registerControllerValue
) => (dispatch) => {
  let newCommCenterMonitoring = Object.assign({}, commCenterMonitoring);
  let regValue = "";
  let regContrValue = "";

  newCommCenterMonitoring.controllers.forEach((contr, i) => {
    contr.registers.forEach((reg, i) => {
      if (
        reg.address === registerControllerValue.registerAddress &&
        reg.Registers_Controllers_values.value !== registerControllerValue.value
      ) {
        regValue = reg.Registers_Controllers_values.value;
        regContrValue = registerControllerValue.value;
        reg.Registers_Controllers_values.value = registerControllerValue.value;
      }
    });
  });
  if (regValue !== regContrValue)
    dispatch(socketUpdateCommCenterMonitoring(newCommCenterMonitoring));
};

export const updateSocketProgrammStatus = (
  commCenterMonitoring,
  controller
) => (dispatch) => {
  let newCommCenterMonitoring = Object.assign({}, commCenterMonitoring);
  let _controllers = [];
  newCommCenterMonitoring.controllers.forEach((contr, i) => {
    if (contr.modbusId === controller.modbusId) {
      contr.programmStatus = controller.programmStatus;
    }
    _controllers.push(contr);
  });
  newCommCenterMonitoring.controllers = _controllers;
  dispatch(socketUpdateCommCenterMonitoring(newCommCenterMonitoring));
};

export const updateSocketControllerStatus = (
  commCenterMonitoring,
  controller
) => (dispatch) => {
  let newCommCenterMonitoring = Object.assign({}, commCenterMonitoring);
  let _controllers = [];
  newCommCenterMonitoring.controllers.forEach((contr, i) => {
    if (contr.modbusId === controller.modbusId) {
      contr.status = controller.status;
    }
    _controllers.push(contr);
  });
  newCommCenterMonitoring.controllers = _controllers;
  dispatch(socketUpdateCommCenterMonitoring(newCommCenterMonitoring));
};
