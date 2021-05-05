import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MapCommCenters from "./MapCommCenters";
import Monitoring from "./Monitoring";
import Controllers from "./Controllers";
import CommCenters from "./CommCenters";
import Registers from "./Registers";
import LeftBar from "./leftBar.component";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
    },

    main: {
      flexGrow: 1,
      padding: theme.spacing(1),
    },
  })
);

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LeftBar />
      <div className={classes.main}>
        <Switch>
          <Route exact path="/main" component={MapCommCenters} />
          <Route exact path="/main/map-notes" component={MapCommCenters} />
          <Route exact path="/main/monitoring" component={Monitoring} />
          <Route exact path="/main/controllers" component={Controllers} />
          <Route exact path="/main/comm-centers" component={CommCenters} />
          <Route exact path="/main/registers" component={Registers} />
        </Switch>
      </div>
    </div>
  );
}
