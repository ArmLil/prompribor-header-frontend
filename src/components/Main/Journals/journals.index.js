import React, { Component } from "react";
import { withStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ruRU } from "@material-ui/core/locale";
import ListJournals from "./list.journals";
// import JournalsGeneralTable from "./journals.GeneralTable";
import AvariiTables from "./Tables/Avarii/avarii.table.index";
import DoneseniiTables from "./Tables/Donesenii/donesenii.table.index";
import NasosiTables from "./Tables/Nasosi/nasosi.table.index";
import FuelTables from "./Tables/Fuel/fuel.table.index";
import isNaturalNumber from "../../../helpers/isNaturalNumber";

import { connect } from "react-redux";
import { getCurrentCommCenter } from "../../../actions/currentCommCenter";
import { setCurrentJournal } from "../../../actions/currentJournal";

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
const validatePage = (number) => {
  let result = false;
  if ((isNaturalNumber(number) && number < 10000) || number === 0)
    result = true;
  return result;
};
const validateLimit = (number) => {
  let result = false;
  if ([5, 10, 25].includes(number)) result = true;
  return result;
};

function CurrentTable(tableName, _commCenter) {
  if (tableName === "avarii") {
    return <AvariiTables />;
  } else if (tableName === "donesenii") {
    return <DoneseniiTables />;
  } else if (tableName === "fuel") {
    return <FuelTables />;
  } else if (tableName === "nasosi") {
    return <NasosiTables />;
  } else return <AvariiTables />;
}

class Journals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJournal: this.props.match.params.journalName,
    };
  }
  componentDidMount() {
    const {
      dispatchGetCommCenter,
      currentCommCenter,
      dispatchSetCurrentJournal,
    } = this.props;
    dispatchSetCurrentJournal(this.props.match.params.journalName);

    const { location } = this.props.history;
    const urlCommCenterPath = this.props.match.params.commCenterPath;
    const { currentJournal } = this.state;

    const searchParams = new URLSearchParams(this.props.location.search);
    let queryPage = +searchParams.get("page");
    let queryLimit = +searchParams.get("limit");
    let queryOffset = 0;

    if (!validatePage(queryPage) || !validateLimit(queryLimit)) {
      queryLimit = currentCommCenter[currentJournal].limit;
      queryOffset = currentCommCenter[currentJournal].offset;
      queryPage = Math.floor(queryOffset / queryLimit);
      const newLocationSearch = `?page=${queryPage}&limit=${queryLimit}`;
      this.props.history.push(`${location.pathname}${newLocationSearch}`);
    } else {
      queryOffset = queryLimit * queryPage;
    }
    const fetchCommCenterUrl = `commCenters/commCenterByPath/${urlCommCenterPath}?offset=${queryOffset}&limit=${queryLimit}&${currentJournal}=true`;
    dispatchGetCommCenter(fetchCommCenterUrl, currentCommCenter);

    //use native js to control Carousel library, on slide change we need to change tables
    setTimeout(() => {
      const { error } = this.props;
      if (error) return;
      let _currentJournal = document.getElementsByClassName(
        "slider-single active"
      )[0].lastChild.firstChild.id;
      this.setState({ currentJournal: _currentJournal });

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
          this.setState({ currentJournal: active_journal_id });
        });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { location } = this.props.history;
    const {
      dispatchGetCommCenter,
      dispatchSetCurrentJournal,
      currentCommCenter,
      global_currentJournal,
    } = this.props;
    const { currentJournal } = this.state;

    const { journalName, commCenterPath } = this.props.match.params;

    const searchParams = new URLSearchParams(this.props.location.search);
    let queryPage = +searchParams.get("page");
    let queryLimit = +searchParams.get("limit");
    let queryOffset = 0;

    if (!validatePage(queryPage) || !validateLimit(queryLimit)) {
      queryLimit = currentCommCenter[currentJournal].limit;
      queryOffset = currentCommCenter[currentJournal].offset;
      queryPage = Math.floor(queryOffset / queryLimit);
      const newLocationSearch = `?page=${queryPage}&limit=${queryLimit}`;
      this.props.history.push(`${location.pathname}${newLocationSearch}`);
    } else {
      queryOffset = queryLimit * queryPage;
    }

    if (currentJournal !== global_currentJournal) {
      dispatchSetCurrentJournal(currentJournal);
    }

    let fetchCommCenterUrl = `commCenters/commCenterByPath/${commCenterPath}?offset=${queryOffset}&limit=${queryLimit}&${currentJournal}=true`;
    if (
      location.pathname !== prevProps.location.pathname &&
      !this.props.loading
    ) {
      queryLimit = currentCommCenter[currentJournal].limit;
      queryOffset = currentCommCenter[currentJournal].offset;
      fetchCommCenterUrl = `commCenters/commCenterByPath/${commCenterPath}?offset=${queryOffset}&limit=${queryLimit}&${currentJournal}=true`;
      dispatchGetCommCenter(fetchCommCenterUrl, currentCommCenter);
    } else if (journalName !== currentJournal && !this.props.loading) {
      queryLimit = currentCommCenter[currentJournal].limit;
      queryOffset = currentCommCenter[currentJournal].offset;
      queryPage = Math.floor(queryOffset / queryLimit);
      const newLocationSearch = `?page=${queryPage}&limit=${queryLimit}`;
      const newLocationPath = `/main/journals/${commCenterPath}/${currentJournal}`;
      this.props.history.push(`${newLocationPath}${newLocationSearch}`);
    } else if (
      location.search !== prevProps.location.search &&
      !this.props.loading
    ) {
      dispatchGetCommCenter(fetchCommCenterUrl, currentCommCenter);
    }
    if (
      +queryPage !== 0 &&
      +currentCommCenter[currentJournal].count < +queryPage * +queryLimit &&
      !this.props.loading
    ) {
      this.props.history.replace(
        `${location.pathname}?page=0&limit=${queryLimit}`
      );
    }
  }

  render() {
    const { classes, error, currentCommCenter } = this.props;
    if (error) {
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
                <div>Error! {error}</div>;
              </Grid>
            </Grid>
          </div>
        </ThemeProvider>
      );
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
  dispatchGetCommCenter: (url, reduserCommcenter) => {
    dispatch(getCurrentCommCenter(url, reduserCommcenter));
  },
  dispatchSetCurrentJournal: (journal) => {
    dispatch(setCurrentJournal(journal));
  },
});

function mapStateToProps(state) {
  const currentCommCenter = state.currentCommCenterReducer.item;
  const global_currentJournal = state.currentJournalReducer.item;
  const { error, loading } = state.currentCommCenterReducer;
  return {
    currentCommCenter,
    error,
    loading,
    global_currentJournal,
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Journals));
