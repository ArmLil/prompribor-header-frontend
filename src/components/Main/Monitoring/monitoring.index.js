import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Loader from "../../Loader";
import Body from "./body";
import Title from "./title";
import { connect } from "react-redux";

import {
  getCommCenterMonitoring,
  updateCommCenterMonitoringBySocket,
} from "../../../actions/commCenterMonitoring";

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
    const { dispatchGetCommCenterMonitoring } = this.props;
    const getControllerUrl = `commCenterControllersRegs/${commCenterPath}`;
    dispatchGetCommCenterMonitoring(getControllerUrl);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { dispatchGetCommCenterMonitoring } = this.props;
    const thisPath = this.props.match.params.commCenterPath;
    const prevPath = prevProps.match.params.commCenterPath;
    if (prevPath !== thisPath) {
      const getControllerUrl = `commCenterControllersRegs/${thisPath}`;
      dispatchGetCommCenterMonitoring(getControllerUrl);
    }
  }

  render() {
    const { classes, commCenterMonitoring, error, loading } = this.props;
    if (error) {
      return <div>Error! {error}</div>;
    }

    if (loading) {
      return <Loader />;
    }

    // const commCenter = mapCommCenters.find(
    //   (el) => el.path === this.props.match.params.commCenterPath
    // );

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title commCenter={commCenterMonitoring} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Body controllers={commCenterMonitoring.controllers} />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetCommCenterMonitoring: (url) => {
    dispatch(getCommCenterMonitoring(url));
  },
  dispatchUpdateCommCenterMonitoringBySocket: (controller, data) => {
    dispatch(updateCommCenterMonitoringBySocket(controller, data));
  },
});

function mapStateToProps(state) {
  // console.log("state.monitoring", state);
  const commCenterMonitoring = state.commCenterMonitoringReducer.item;
  const { error, loading } = state.commCenterMonitoringReducer;

  return {
    error,
    loading,
    commCenterMonitoring,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Monitoring));
