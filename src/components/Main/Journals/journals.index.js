import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Loader from "../../Loader";
import ListJournals from "./list.journals";
// import JournalsGeneralTable from "./journals.GeneralTable";
import AvariiTables from "./Tables/Avarii/avarii.tables";
import DoneseniiTables from "./Tables/Donesenii/donesenii.table.index";
import NasosiTables from "./Tables/Nasosi/nasosi.table.index";

import { connect } from "react-redux";
import { getCommCenters } from "../../../actions/commCenters";
import { getController } from "../../../actions/controller";

const useStyles = (theme: Theme) =>
  createStyles({
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
      currentJournal: <AvariiTables commCenter={""} />,
      currentCommCenter: "",
    };
  }
  componentDidMount() {
    //use native js to control Carousal library, on change slide we need to change tables
    setTimeout(() => {
      console.log("componentDidMount");
      const commCenterPath = this.props.match.params.commCenterPath;
      const { commCenters } = this.props;
      let currentCommCenter = commCenters.find((commCenter) => {
        if (commCenter.path === commCenterPath) {
          return commCenter;
        }
        return null;
      });
      this.setState(
        {
          currentCommCenter,
        },
        () => {
          this.setState({
            currentJournal: (
              <AvariiTables commCenter={this.state.currentCommCenter} />
            ),
          });
        }
      );

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
          let active_journal_name =
            active_journal[0].childNodes[2].childNodes[0].attributes.name;
          if (
            active_journal_name.nodeValue === "учета донесений и распорежений"
          ) {
            this.setState({
              currentJournal: (
                <DoneseniiTables commCenter={this.state.currentCommCenter} />
              ),
            });
          }
          if (
            active_journal_name.nodeValue ===
            "учета режимов работы насосных станций"
          ) {
            this.setState({
              currentJournal: (
                <NasosiTables commCenter={this.state.currentCommCenter} />
              ),
            });
          }
          if (
            active_journal_name.nodeValue ===
            "учета аварий и неисправностей на трубопроводе"
          ) {
            this.setState({
              currentJournal: (
                <AvariiTables commCenter={this.state.currentCommCenter} />
              ),
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
          let active_journal_name =
            active_journal[0].childNodes[2].childNodes[0].attributes.name;
          if (
            active_journal_name.nodeValue ===
            "учета аварий и неисправностей на трубопроводе"
          ) {
            this.setState({
              currentJournal: (
                <AvariiTables commCenter={this.state.currentCommCenter} />
              ),
            });
          } else if (
            active_journal_name.nodeValue ===
            "учета режимов работы насосных станций"
          ) {
            this.setState({
              currentJournal: (
                <NasosiTables commCenter={this.state.currentCommCenter} />
              ),
            });
          } else if (
            active_journal_name.nodeValue === "учета донесений и распорежений"
          ) {
            this.setState({
              currentJournal: (
                <DoneseniiTables commCenter={this.state.currentCommCenter} />
              ),
            });
          }
        });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    const { commCenters } = this.props;
    const thisPath = this.props.match.params.commCenterPath;
    const prevPath = prevProps.match.params.commCenterPath;
    if (prevPath !== thisPath) {
      let currentCommCenter = commCenters.find((commCenter) => {
        if (commCenter.path === thisPath) {
          return commCenter;
        }
        return null;
      });
      this.setState({
        currentCommCenter,
      });
      let currentJournalName = this.state.currentJournal.type.name;
      if (currentJournalName === "AvariiTables") {
        this.setState({
          currentJournal: <AvariiTables commCenter={currentCommCenter} />,
        });
      }
      if (currentJournalName === "NasosiTables") {
        this.setState({
          currentJournal: <NasosiTables commCenter={currentCommCenter} />,
        });
      }
      if (currentJournalName === "DoneseniiTables") {
        this.setState({
          currentJournal: <DoneseniiTables commCenter={currentCommCenter} />,
        });
      }
    }
  }

  render() {
    const { classes, commCenters, error, loading } = this.props;
    commCenters.sort(function (a, b) {
      return a.index - b.index;
    });

    if (error) {
      return <div>Error! {error}</div>;
    }

    if (
      loading ||
      !this.state.currentCommCenter ||
      !this.state.currentJournal.props.commCenter
    ) {
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
