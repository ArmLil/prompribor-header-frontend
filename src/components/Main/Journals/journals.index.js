import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader from "../../Loader";
import ListJournals from "./list.journals";
import JournalsGeneralTable from "./journals.GeneralTable";
import JournalsGnsTable from "./journals.GnsTable";

import { connect } from "react-redux";
import { getCommCenters } from "../../../actions/commCenters";

const useStyles = (theme: Theme) =>
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
  });

class Journals extends Component {
  render() {
    console.log(this.props);
    const { classes } = this.props;
    // const { classes, commCenters, error, loading, history } = this.props;
    //
    // commCenters.sort(function (a, b) {
    //   return a.index - b.index;
    // });
    //
    // if (error) {
    //   return <div>Error! {error.message}</div>;
    // }
    //
    // if (loading) {
    //   return <Loader />;
    // }
    return (
      <div style={{ margin: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Paper className={classes.paper}>
              <ListJournals />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <JournalsGeneralTable />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <JournalsGnsTable />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchGetCommCenters: (url) => {
    dispatch(getCommCenters(url));
  },
});

function mapStateToProps(state) {
  const { message } = state.message;
  const commCenters = state.commCentersReducer.items;
  const { error, loading } = state.commCentersReducer;
  return {
    message,
    commCenters,
    error,
    loading,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Journals));
