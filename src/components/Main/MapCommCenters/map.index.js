import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { updateMapCommCentersBySocket } from "../../../actions/mapCommCenters";
import { socket } from "../../../socket_api";
import Loader from "../../Loader";

import Map from "./map";
// import CommCentersTable from "./commCentersTable";

const useStyles = makeStyles((theme) => ({
  container: (props) => ({
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  }),
  paper: (props) => ({
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    whiteSpace: "nowrap",
    marginBottom: theme.spacing(1),
  }),
}));

export default function MapCommCenters(props) {
  const dispatch = useDispatch();
  const mapCommCenters = useSelector(
    (state) => state.mapCommCentersReducer.items
  );
  const error = useSelector((state) => {
    return state.mapCommCentersReducer.error;
  });
  const loading = useSelector((state) => state.mapCommCentersReducer.loading);
  const bridge = useSelector((state) => state.mapCommCentersReducer.bridge);
  const mapPolylinePoints = useSelector(
    (state) => state.mapCommCentersReducer.mapPolylinePoints
  );
  const images = useSelector((state) => {
    return state.mapCommCentersReducer.images;
  });
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const updateCommCenterListener = (data) => {
      dispatch(updateMapCommCentersBySocket(data));
    };
    socket.on("updateMapCommCenters", updateCommCenterListener);
    return () => {
      socket.off("updateMapCommCenters", updateCommCenterListener);
    };
  }, [mapCommCenters, dispatch]);

  if (error) {
    return <div>Error! {error}</div>;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ margin: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ zIndex: 2 }}>
          <Paper className={classes.paper} style={{ zIndex: 2 }}>
            <Map
              commCenters={mapCommCenters}
              history={history}
              mapPolylinePoints={mapPolylinePoints}
              bridge={bridge}
              images={images}
              style={{ zIndex: 1 }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
