import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GlobalContainer from "./components/global.container";
import { addJournalData } from "./actions/commCenters";
import { socket, SocketContext } from "./socket_api";

export default function App() {
  const dispatch = useDispatch();
  const commCenters = useSelector((state) => state.commCentersReducer.items);

  useEffect(() => {
    const updateCommCentersFuelData = (data) => {
      console.log("fuel socket");
      dispatch(addJournalData(commCenters, data.commCenterPath, "fuel", data));
    };
    const updateCommCentersNasosiData = (data) => {
      console.log("nasosi socket");
      dispatch(
        addJournalData(commCenters, data.commCenterPath, "nasosi", data)
      );
    };

    socket.on("nasosi_data", updateCommCentersNasosiData);
    socket.on("fuel_data", updateCommCentersFuelData);
    return () => {
      socket.off("fuel_data", updateCommCentersFuelData);
      socket.off("nasosi_data", updateCommCentersNasosiData);
    };
  }, [commCenters, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      <GlobalContainer />
    </SocketContext.Provider>
  );
}
