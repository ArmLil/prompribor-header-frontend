import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TopNavBar from "./topNavbar";
import Loader from "../Loader";
import Body from "./body";

import { connect } from "react-redux";
import { getData } from "../../actions/data";

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
  componentDidMount() {
    // console.log("this.props", this.props);
    const name = this.props.match.params.name;
    console.log({ name });
    const { commCenters, dispatchGetData } = this.props;
    const getCommCenterUrl = "commCenters?controller=include";

    if (commCenters.length === 0) {
      dispatchGetData(getCommCenterUrl);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log({ prevProps, prevState, snapshot });
    const name = this.props.match.params.name;
    console.log({ name });
  }
  render() {
    const { classes, commCenters, error, loading } = this.props;
    const name = this.props.match.params.name;
    commCenters.sort(function (a, b) {
      return a.index - b.index;
    });

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <Loader />;
    }
    return <div className={classes.root}>{name}</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetData: (url) => {
    dispatch(getData(url));
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
)(withStyles(useStyles)(Monitoring));
