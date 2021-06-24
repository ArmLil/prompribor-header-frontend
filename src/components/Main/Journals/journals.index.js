import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader from "../../Loader";
import ListJournals from "./list.journals";
import JournalsGeneralTable from "./journals.GeneralTable";
import AvariiTables from "./Tables/avarii.tables";
import DoneseniiTables from "./Tables/donesenii.tables";
import NasosiTables from "./Tables/nasosi.tables";

import { connect } from "react-redux";
import { getCommCenters } from "../../../actions/commCenters";

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

class Journals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJournal: <AvariiTables commCenters={this.props.commCenters} />,
    };
  }
  componentDidMount() {
    //use native js to control Carousal library
    setTimeout(() => {
      const { commCenters } = this.props;

      //change arrows styles in library
      let list_i_left = document.getElementsByClassName("fa fa-arrow-left");
      let list_i_right = document.getElementsByClassName("fa fa-arrow-right");

      for (let i = 0; i < list_i_left.length; ++i) {
        list_i_left[i].style.color = "#6c757d7a";
      }
      for (let i = 0; i < list_i_right.length; ++i) {
        list_i_right[i].style.color = "#6c757d7a";
      }
      let slider_left = document.getElementsByClassName("slider-left");
      for (let i = 0; i < slider_left.length; ++i) {
        slider_left[i].addEventListener("click", () => {
          let active_journal = document.getElementsByClassName(
            "slider-single preactive"
          );
          let active_alt =
            active_journal[0].childNodes[2].childNodes[0].attributes.name;
          if (active_alt.nodeValue === "учета донесений и распорежений") {
            this.setState({
              currentJournal: <DoneseniiTables commCenters={commCenters} />,
            });
          }
          if (
            active_alt.nodeValue === "учета режимов работы насосных станций"
          ) {
            this.setState({
              currentJournal: <NasosiTables commCenters={commCenters} />,
            });
          }
          if (
            active_alt.nodeValue ===
            "учета аварий и неисправностей на трубопроводе"
          ) {
            this.setState({
              currentJournal: <AvariiTables commCenters={commCenters} />,
            });
          }
        });
      }
      let slider_right = document.getElementsByClassName("slider-right");
      for (let i = 0; i < slider_right.length; ++i) {
        slider_right[i].addEventListener("click", () => {
          let active_journal = document.getElementsByClassName(
            "slider-single proactive"
          );
          let active_alt =
            active_journal[0].childNodes[2].childNodes[0].attributes.name;
          if (active_alt.nodeValue === "учета донесений и распорежений") {
            this.setState({
              currentJournal: <DoneseniiTables commCenters={commCenters} />,
            });
          }
          if (
            active_alt.nodeValue === "учета режимов работы насосных станций"
          ) {
            this.setState({
              currentJournal: <NasosiTables commCenters={commCenters} />,
            });
          }
          if (
            active_alt.nodeValue ===
            "учета аварий и неисправностей на трубопроводе"
          ) {
            this.setState({
              currentJournal: <AvariiTables commCenters={commCenters} />,
            });
          }
        });
      }
    }, 1000);
  }

  render() {
    const { classes, commCenters, error, loading, history } = this.props;

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
      <div style={{ margin: 20 }}>
        <Grid container spacing={2}>
          <Grid item xs={11}>
            <Paper className={classes.paper}>
              <ListJournals />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{this.state.currentJournal}</Paper>
          </Grid>
        </Grid>
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
)(withStyles(useStyles)(Journals));
