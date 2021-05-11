import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TopNavBar from "./topNavbar";
import Loader from "../../Loader";
import Body from "./body";

import { connect } from "react-redux";
import { getController } from "../../../actions/controller";

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    main: {
      flexGrow: 1,
    },
  });

class Monitoring extends Component {
  constructor() {
    super();

    // Define the initial state:
    this.state = {
      controller: {},
      controllerPath: "",
    };
  }
  componentDidMount() {
    // console.log("this.props", this.props);
    const commCenterPath = this.props.match.params.commCenterPath;
    const { controller, dispatchGetController } = this.props;
    const getControllerUrl = `controllers/getRegGroupsRegistersValues/${commCenterPath}`;
    console.log("row 30 begin dispatch");
    dispatchGetController(getControllerUrl);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const thisPath = this.props.match.params.commCenterPath;
    const prevPath = prevProps.match.params.commCenterPath;
    if (prevPath !== thisPath) {
      const getControllerUrl = `controllers/getRegGroupsRegistersValues/${thisPath}`;
      this.props.dispatchGetController(getControllerUrl);
    }
  }
  componentWillUnmount() {
    console.log("Unmount");
  }

  render() {
    const { classes, controller, error, loading } = this.props;
    const commCenterPath = this.props.match.params.commCenterPath;

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <Loader />;
    }
    return <div className={classes.root}>{controller.commCenterPath}</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetController: (url) => {
    dispatch(getController(url));
  },
});

function mapStateToProps(state) {
  console.log("state.controller", state.controllerReducer.item);
  const { message } = state.message;
  const controller = state.controllerReducer.item;
  const { error, loading } = state.controllerReducer;
  return {
    message,
    controller,
    error,
    loading,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Monitoring));
