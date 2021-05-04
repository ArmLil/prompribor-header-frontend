import React from "react";
import { Switch, Route } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import MapNotes from "./MapNotes";
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
    note: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    map: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: 500,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LeftBar />
      <main className={classes.content}>
        <div>
          <Switch>
            <Route exact path="/main" component={MapNotes} />
            <Route exact path="/main/map-notes" component={MapNotes} />
            <Route exact path="/main/monitoring" component={Monitoring} />
            <Route exact path="/main/controllers" component={Controllers} />
            <Route exact path="/main/comm-centers" component={CommCenters} />
            <Route exact path="/main/registers" component={Registers} />
          </Switch>
        </div>
      </main>
    </div>
  );
}
