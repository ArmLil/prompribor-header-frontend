import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Loader from "../../Loader";
import Body from "./body";
import Title from "./title";
import { connect } from "react-redux";
import { getController } from "../../../actions/controller";

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

    // Define the initial state:
    this.state = {};
  }
  componentDidMount() {
    // console.log("this.props", this.props);
    const commCenterPath = this.props.match.params.commCenterPath;
    const { dispatchGetController } = this.props;
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
    // console.log("Unmount");
  }

  render() {
    const { classes, controller, error, loading } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <Loader />;
    }
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title controller={controller} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Body controller={controller} />
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchGetController: (url) => {
    dispatch(getController(url));
  },
});

function mapStateToProps(state) {
  // console.log("state.monitoring", state);
  const { message } = state.message;
  const controller = state.controllerReducer.item;
  const { error, loading } = state.controllerReducer.item;
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
