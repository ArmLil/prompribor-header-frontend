import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import MapCommCenters from "./MapCommCenters/map.index";
import Monitoring from "./Monitoring/monitoring.index";
import Journals from "./Journals/journals.index";
import Controllers from "./Controllers/controllers.index";
import CommCenters from "./CommCenters/commCenters.index";
import Users from "./Users/users.index";
import Registers from "./Registers";
import LeftBar from "./LeftBar/leftBar.index";
import Loader from "../Loader";

import { connect } from "react-redux";
import { getMapCommCenters } from "../../actions/mapCommCenters";

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    main: {
      flexGrow: 1,
      overflow: "scroll",
    },
  });

class Main extends Component {
  componentDidMount() {
    console.log("componentDidMount() Main....");
    const { mapCommCenters, dispatchGetMapCommCenters } = this.props;
    const getMapCommCentersUrl = "mapCommCenters";

    if (mapCommCenters.length === 0) {
      dispatchGetMapCommCenters(getMapCommCentersUrl);
    }
  }
  render() {
    const { classes, mapCommCenters, error, loading } = this.props;
    mapCommCenters.sort(function (a, b) {
      return a.index - b.index;
    });

    if (error) {
      console.log({ error });
      return <div>Error! {error}</div>;
    }

    if (loading || mapCommCenters.length === 0) {
      return <Loader />;
    }
    return (
      <div className={classes.root}>
        <LeftBar commCenters={mapCommCenters} />
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
            <Route
              exact
              path="/main/journals/:commCenterPath"
              component={Journals}
            />
            <Route
              exact
              path="/main/admin/controllers"
              component={Controllers}
            />
            <Route
              exact
              path="/main/admin/comm-centers"
              component={CommCenters}
            />
            <Route exact path="/main/admin/registers" component={Registers} />
            <Route exact path="/main/admin/users" component={Users} />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchGetMapCommCenters: (url) => {
    dispatch(getMapCommCenters(url));
  },
});

function mapStateToProps(state) {
  const mapCommCenters = state.mapCommCentersReducer.items;
  const { error, loading } = state.mapCommCentersReducer;
  return {
    mapCommCenters,
    error,
    loading,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Main));
