import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GlobalContainer from "./components/global.container";
import { updateControllerBySocket } from "./actions/controller";
import { socket } from "./socket_api";

export default function App() {
  const dispatch = useDispatch();
  const controller = useSelector((state) => state.controllerReducer.item);

  useEffect(() => {
    const getSocket = () => {
      // socket.on("connection", (data) => {
      //   console.log(data);
      // });
      socket.on("registerControllerValue", (data) => {
        console.log("socket on registerControllerValue");
        console.log(data);

        if (
          controller.name !== "" &&
          controller.modbusId == data.controllerModbusId
        ) {
          dispatch(updateControllerBySocket(controller, data));
        }
      });
    };
    getSocket();
  }, [controller]);

  return (
    <div>
      <GlobalContainer />
    </div>
  );
}
