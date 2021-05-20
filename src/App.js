import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GlobalContainer from "./components/global.container";
import { updateControllerBySocket } from "./actions/controller";
import { socket, SocketContext } from "./socket_api";

export default function App() {
  const dispatch = useDispatch();
  const controller = useSelector((state) => state.controllerReducer.item);

  useEffect(() => {
    socket.once("registerControllerValue", (data) => {
      console.log("socket on registerControllerValue");
      console.log(data);

      if (
        controller.name !== "" &&
        controller.modbusId === data.controllerModbusId
      ) {
        dispatch(updateControllerBySocket(controller, data));
      }
    });
  }, [controller, dispatch, socket]);

  return (
    <SocketContext.Provider value={socket}>
      <GlobalContainer />
    </SocketContext.Provider>
  );
}
