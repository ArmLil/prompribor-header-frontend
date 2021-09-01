import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Loader from "../../Loader";
import Body from "./body";
import Title from "./title";
import { connect } from "react-redux";

import {
  getControllersForCommCenter,
  updateControllerBySocket,
} from "../../../actions/controllersForCommCenters";

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0.8,
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(12, 1fr)",
      gridGap: theme.spacing(3),
    },
    paper: {
      padding: theme.spacing(1),
      // color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      marginBottom: theme.spacing(1),
    },
    title: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
    firstLayerTitle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "baseline",
      justifyContent: "space-between",
    },
    subTitle: {
      marginRight: 10,
      color: theme.palette.text.secondary,
    },
  });

class Monitoring extends Component {
  constructor() {
    super();

    this.state = {};
  }
  componentDidMount() {
    console.log(this.props.match.params);
    const commCenterPath = this.props.match.params.commCenterPath;
    const { dispatchGetControllersForCommCenter } = this.props;
    const getControllerUrl = `controllers/getRegGroupsRegistersValues/${commCenterPath}`;
    dispatchGetControllersForCommCenter(getControllerUrl);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { dispatchGetControllersForCommCenter } = this.props;
    const thisPath = this.props.match.params.commCenterPath;
    const prevPath = prevProps.match.params.commCenterPath;
    if (prevPath !== thisPath) {
      const getControllerUrl = `controllers/getRegGroupsRegistersValues/${thisPath}`;
      dispatchGetControllersForCommCenter(getControllerUrl);
    }
  }

  render() {
    const {
      classes,
      controllersForCommCenter,
      error,
      loading,
      mapCommCenters,
    } = this.props;
    if (error) {
      return <div>Error! {error}</div>;
    }

    if (loading) {
      return <Loader />;
    }

    const commCenter = mapCommCenters.find(
      (el) => el.path === this.props.match.params.commCenterPath
    );

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title commCenter={commCenter} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Body controllersForCommCenter={controllersForCommCenter} />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetControllersForCommCenter: (url) => {
    dispatch(getControllersForCommCenter(url));
  },
  dispatchUpdateControllerBySocket: (controller, data) => {
    dispatch(updateControllerBySocket(controller, data));
  },
});

function mapStateToProps(state) {
  // console.log("state.monitoring", state);
  const { message } = state.message;
  const controllersForCommCenter =
    state.controllersForCommCentersReducer.controllers;
  const { error, loading } = state.controllersForCommCentersReducer;
  const mapCommCenters = state.mapCommCentersReducer.items;
  return {
    message,
    error,
    loading,
    controllersForCommCenter,
    mapCommCenters,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Monitoring));
