import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import MapCommCenters from "./MapCommCenters/map.index";
import Monitoring from "./Monitoring/monitoring.index";
import Journals from "./Journals/journals.index";
import Controllers from "./Administration/Controllers/controllers.index";
import Users from "./Administration/Users/users.index";
import Stations from "./Administration/Stations/stations.index";
import Pipeline from "./Administration/Pipeline/pipeline.index";
import Images from "./Administration/Images/images.index";
import MapImages from "./Administration/MapImages/mapImages.index";
import Registers from "./Administration/Registers";
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

    if (mapCommCenters.length === 0) {
      dispatchGetMapCommCenters("mapCommCenters");
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
            <Redirect
              exact
              from="/main/journals/:commCenterPath"
              to="/main/journals/:commCenterPath/avarii"
            />
            <Route
              exact
              path="/main/journals/:commCenterPath/:journalName"
              component={Journals}
            />
            <Route
              exact
              path="/main/admin/controllers"
              component={Controllers}
            />
            <Route exact path="/main/admin/registers" component={Registers} />
            <Route exact path="/main/admin/users" component={Users} />
            <Route exact path="/main/admin/stations" component={Stations} />
            <Route exact path="/main/admin/pipeline" component={Pipeline} />
            <Route exact path="/main/admin/images" component={Images} />
            <Route exact path="/main/admin/mapImages" component={MapImages} />
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
