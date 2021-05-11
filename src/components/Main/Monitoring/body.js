import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import TopNavBar from "./topNavbar";
import Loader from "../../Loader";

import { connect } from "react-redux";
import { getCommCenters } from "../../../actions/commCenters";

const useStyles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },

    main: {
      flexGrow: 1,
    },
  });

class Body extends Component {
  componentDidMount() {
    console.log("this.props", this.props);
    // const name = this.props.match.params.name;
    // console.log({ name });
    // console.log("this.props", this.props);
    // const { commCenters, dispatchGetData } = this.props;
    // const getCommCenterUrl = "commCenters?controller=include";
    //
    // if (commCenters.length === 0) {
    //   dispatchGetData(getCommCenterUrl);
    // }
  }
  render() {
    // const { classes, commCenters, error, loading } = this.props;
    // const name = this.props.match.params.name;
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
      <div>
        <h2> ""</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetData: (url) => {
    dispatch(getCommCenters(url));
  },
});

function mapStateToProps(state) {
  console.log({ state });
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
)(withStyles(useStyles)(Body));
