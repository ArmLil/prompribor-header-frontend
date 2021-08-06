import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader from "../../Loader";

import { connect } from "react-redux";
import { getCommCenters } from "../../../actions/commCenters";

import Map from "./map";
import CommCentersTable from "./commCentersTable";

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

class MapCommCenters extends Component {
  render() {
    const {
      classes,
      commCenters,
      error,
      loading,
      history,
      mapPolylinePoints,
      bridge,
    } = this.props;

    // commCenters.sort(function (a, b) {
    //   return a.index - b.index;
    // });

    if (error) {
      return <div>Error! {error}</div>;
    }

    if (loading) {
      return <Loader />;
    }
    return (
      <div style={{ margin: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Paper className={classes.paper} style={{ backgroundColor: "" }}>
              <Map
                commCenters={commCenters}
                history={history}
                mapPolylinePoints={mapPolylinePoints}
                bridge={bridge}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <CommCentersTable commCenters={commCenters} />
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
  const mapPolylinePoints = state.commCentersReducer.mapPolylinePoints;
  const bridge = state.commCentersReducer.bridge;
  const { error, loading } = state.commCentersReducer;
  return {
    message,
    commCenters,
    mapPolylinePoints,
    bridge,
    error,
    loading,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(MapCommCenters));
