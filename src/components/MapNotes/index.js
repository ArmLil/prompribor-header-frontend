import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Map from "./map";
import LastNotes from "./lastNotes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      marginBottom: theme.spacing(1),
    },
  })
);

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            <Map />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.paper}>
            <LastNotes />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
