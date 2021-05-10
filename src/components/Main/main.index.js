import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import MapCommCenters from "../MapCommCenters/map.index";
import Monitoring from "../Monitoring/monitoring.index";
import Controllers from "../Controllers/controllers.index";
import CommCenters from "../CommCenters/commCenters.index";
import Registers from "../Registers";
import LeftBar from "./leftBar.component";
import Loader from "../Loader";

import { connect } from "react-redux";
import { getCommCenters } from "../../actions/commCenters";

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    main: {
      flexGrow: 1,
    },
  });

class Main extends Component {
  componentDidMount() {
    // console.log("this.props", this.props);
    const { commCenters, dispatchGetCommCenters } = this.props;
    const getCommCenterUrl = "commCenters?controller=include";

    if (commCenters.length === 0) {
      dispatchGetCommCenters(getCommCenterUrl);
    }
  }
  render() {
    const { classes, commCenters, error, loading } = this.props;

    commCenters.sort(function (a, b) {
      return a.index - b.index;
    });

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <Loader />;
    }
    return (
      <div className={classes.root}>
        <LeftBar commCenters={commCenters} />
        <div className={classes.main}>
          <Switch>
            <Route exact path="/main" component={MapCommCenters} />
            <Route
              exact
              path="/main/map-commCenters"
              component={MapCommCenters}
            />
            <Route
              exact
              path="/main/monitoring/:commCenterPath"
              component={Monitoring}
            />
            <Route exact path="/main/controllers" component={Controllers} />
            <Route exact path="/main/comm-centers" component={CommCenters} />
            <Route exact path="/main/registers" component={Registers} />
          </Switch>
        </div>
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
)(withStyles(useStyles)(Main));
