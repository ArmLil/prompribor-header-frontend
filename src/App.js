import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import GlobalContainer from "./components/global.container";
import { addJournalData } from "./actions/commCenters";
import { logout } from "./actions/auth";
import { socket, SocketContext } from "./socket_api";
import "./settings/axios";

export default function App() {
  const dispatch = useDispatch();
  const currentCommCenter = useSelector(
    (state) => state.currentCommCenterReducer.item
  );
  const currentJournal = useSelector(
    (state) => state.currentJournalReducer.item
  );
  const alertState = useSelector((state) => state.alertReducer);
  const { show, text, status } = alertState;
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const logoutHandler = () => {
      const now = new Date();
      let userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      if (userFromLocalStorage) {
        let time = userFromLocalStorage.ttl;
        if (userFromLocalStorage && now.getTime() > time) {
          dispatch(logout());
        }
      }
    };
    logoutHandler();
    window.addEventListener("click", logoutHandler, false);
  });

  useEffect(() => {
    // if (commCenters.length === 0)
    const updateCommCentersFuelData = (data) => {
      dispatch(addJournalData(currentCommCenter, currentJournal, "fuel", data));
    };
    const updateCommCentersNasosiData = (data) => {
      dispatch(
        addJournalData(currentCommCenter, currentJournal, "nasosi", data)
      );
    };

    socket.on("nasosi_data", updateCommCentersNasosiData);
    socket.on("fuel_data", updateCommCentersFuelData);
    return () => {
      socket.off("fuel_data", updateCommCentersFuelData);
      socket.off("nasosi_data", updateCommCentersNasosiData);
    };
  }, [currentCommCenter, currentJournal, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      <GlobalContainer />
      <Snackbar open={show} autoHideDuration={5000}>
        <Alert severity={status} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </SocketContext.Provider>
  );
}
