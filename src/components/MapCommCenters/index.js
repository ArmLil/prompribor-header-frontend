import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader from "../Loader";

import { connect } from "react-redux";
import { getData } from "../../actions/data";

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
  constructor(props) {
    super(props);

    this.state = {
      currentCommCenters: [],
    };
  }
  componentDidMount() {
    console.log("this.props", this.props);
    const { commCenters, dispatchGetData } = this.props;
    const getCommCenterUrl = "commCenters?controller=include";

    if (commCenters.length === 0) {
      dispatchGetData(getCommCenterUrl);
    }
  }
  render() {
    const { classes, commCenters, error, loading } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Paper className={classes.paper}>
              <Map />
            </Paper>
          </Grid>
          <Grid item xs={5}>
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
)(withStyles(useStyles)(MapCommCenters));
