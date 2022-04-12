import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ruRU } from "@material-ui/core/locale";
import Loader from "../../Loader";
import ListJournals from "./list.journals";
// import JournalsGeneralTable from "./journals.GeneralTable";
import AvariiTables from "./Tables/Avarii/avarii.table.index";
import DoneseniiTables from "./Tables/Donesenii/donesenii.table.index";
import NasosiTables from "./Tables/Nasosi/nasosi.table.index";
import FuelTables from "./Tables/Fuel/fuel.table.index";

import { connect } from "react-redux";
import { getCurrentCommCenter } from "../../../actions/currentCommCenter";

const theme = createTheme(
  {
    palette: {
      primary: { main: "#1976d2" },
    },
  },
  ruRU
);

const useStyles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      marginBottom: theme.spacing(1),
    },
    paperJournal: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      whiteSpace: "nowrap",
      marginBottom: theme.spacing(1),
    },
  });

function CurrentTable(tableName, _commCenter) {
  if (tableName === "avarii") {
    return <AvariiTables commCenter={_commCenter} />;
  } else if (tableName === "donesenii") {
    return <DoneseniiTables commCenter={_commCenter} />;
  } else if (tableName === "fuel") {
    return <FuelTables commCenter={_commCenter} />;
  } else if (tableName === "nasosi") {
    return <NasosiTables commCenter={_commCenter} />;
  } else return <AvariiTables commCenter={""} />;
}

class Journals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJournal: this.props.match.params.journalName,
      currentCommCenter: {},
    };
  }
  componentDidMount() {
    //use native js to control Carousel library, on slide change we need to change tables
    const { dispatchGetCommCenter } = this.props;
    const commCenterPath = this.props.match.params.commCenterPath;
    dispatchGetCommCenter(`commCenters/commCenterByPath/${commCenterPath}`);
    setTimeout(() => {
      const { currentCommCenter } = this.props;
      this.setState({ currentJournal: this.props.match.params.journalName });
      //change arrows styles in library
      let list_i_left = document.getElementsByClassName("fa fa-arrow-left");
      let list_i_right = document.getElementsByClassName("fa fa-arrow-right");

      for (let i = 0; i < list_i_left.length; ++i) {
        list_i_left[i].style.color = "#6c757d7a";
      }
      for (let i = 0; i < list_i_right.length; ++i) {
        list_i_right[i].style.color = "#6c757d7a";
      }
      //////
      let slider_left = document.getElementsByClassName("slider-left");
      for (let i = 0; i < slider_left.length; ++i) {
        slider_left[i].addEventListener("click", () => {
          let active_journal = document.getElementsByClassName(
            "slider-single preactive"
          );
          let active_journal_id = active_journal[0].lastChild.firstChild.id;
          this.setState({ currentJournal: active_journal_id });
        });
      }

      let slider_right = document.getElementsByClassName("slider-right");
      for (let i = 0; i < slider_right.length; ++i) {
        slider_right[i].addEventListener("click", () => {
          let active_journal = document.getElementsByClassName(
            "slider-single proactive"
          );
          let active_journal_id = active_journal[0].lastChild.firstChild.id;
          let currentTable = CurrentTable(active_journal_id, currentCommCenter);
          this.setState({ currentJournal: active_journal_id });
        });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");

    const urlCommCenterPath = this.props.match.params.commCenterPath;
    if (this.props.currentCommCenter.path !== urlCommCenterPath) {
      const { dispatchGetCommCenter } = this.props;
      dispatchGetCommCenter(
        `commCenters/commCenterByPath/${urlCommCenterPath}`
      );
    }
    if (this.props.match.params.journalName !== this.state.currentJournal) {
      this.props.history.replace({
        pathname: `${this.props.match.url.replace(
          this.props.match.params.journalName,
          this.state.currentJournal
        )}`,
      });
    }
  }

  render() {
    console.log("render");
    const { classes, error, loading, currentCommCenter } = this.props;
    if (error) {
      return <div>Error! {error}</div>;
    }

    let currentTable = CurrentTable(
      this.state.currentJournal,
      currentCommCenter
    );

    return (
      <ThemeProvider theme={theme}>
        <div style={{ margin: 20 }}>
          <Grid container spacing={2} style={{ width: "90vw" }}>
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <ListJournals />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paperJournal}>{currentTable}</Paper>
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  dispatchGetCommCenter: (url) => {
    dispatch(getCurrentCommCenter(url));
  },
});

function mapStateToProps(state) {
  const currentCommCenter = state.currentCommCenterReducer.item;
  const { error, loading } = state.currentCommCenterReducer;
  return {
    currentCommCenter,
    error,
    loading,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Journals));
