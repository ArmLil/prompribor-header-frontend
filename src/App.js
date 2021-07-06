import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GlobalContainer from "./components/global.container";
import { updateControllerBySocket } from "./actions/controllersForCommCenters";
import { socket, SocketContext } from "./socket_api";

export default function App() {
  const dispatch = useDispatch();
  const controllers = useSelector(
    (state) => state.controllersForCommCentersReducer.controllers
  );

  useEffect(() => {
    // let isMounted = true;
    const updateControllerListener = (data) => {
      console.log("socket on registerControllerValue");
      console.log(data);

      dispatch(updateControllerBySocket(controllers, data));
    };
    socket.on("registerControllerValue", updateControllerListener);
    return () => {
      // isMounted = false;
      socket.off("registerControllerValue", updateControllerListener);
    };
  }, [controllers, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      <GlobalContainer />
    </SocketContext.Provider>
  );
}
