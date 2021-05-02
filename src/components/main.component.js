import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LastNotes from "./LastNotes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    map: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: 500
    }
  })
);

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1} column>
        <Grid item xs={5}>
          <LastNotes className={classes.paper} />
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.map}>карта трубопроводов</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
