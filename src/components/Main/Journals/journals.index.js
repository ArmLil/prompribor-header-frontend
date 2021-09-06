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

class Journals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentJournal: <AvariiTables commCenter={""} />,
      currentCommCenter: {},
    };
  }
  componentDidMount() {
    //use native js to control Carousal library, on change slide we need to change tables
    const { dispatchGetCommCenter } = this.props;
    const commCenterPath = this.props.match.params.commCenterPath;
    console.log({ commCenterPath });
    dispatchGetCommCenter(`commCenters/${commCenterPath}`);
    setTimeout(() => {
      console.log("componentDidMount");
      const { currentCommCenter } = this.props;

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
            active_journal_name.nodeValue === "учета донесений и распоряжений"
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
          if (
            active_journal_name.nodeValue ===
            "учёта параметров процесса транспортирования горючего"
          ) {
            this.setState({
              currentJournal: (
                <FuelTables commCenter={this.state.currentCommCenter} />
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
            active_journal_name.nodeValue === "учета донесений и распоряжений"
          ) {
            this.setState({
              currentJournal: (
                <DoneseniiTables commCenter={this.state.currentCommCenter} />
              ),
            });
          } else if (
            active_journal_name.nodeValue ===
            "учёта параметров процесса транспортирования горючего"
          ) {
            this.setState({
              currentJournal: (
                <FuelTables commCenter={this.state.currentCommCenter} />
              ),
            });
          }
        });
      }
    }, 2000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    const thisPath = this.props.match.params.commCenterPath;
    const prevPath = prevProps.match.params.commCenterPath;
    if (prevPath !== thisPath) {
      // window.location.reload();
      const { dispatchGetCommCenter } = this.props;
      const commCenterPath = this.props.match.params.commCenterPath;
      console.log({ commCenterPath });
      dispatchGetCommCenter(`commCenters/${commCenterPath}`);
      setTimeout(() => {
        console.log("componentDidMount");
        const { currentCommCenter } = this.props;

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
              active_journal_name.nodeValue === "учета донесений и распоряжений"
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
            if (
              active_journal_name.nodeValue ===
              "учёта параметров процесса транспортирования горючего"
            ) {
              this.setState({
                currentJournal: (
                  <FuelTables commCenter={this.state.currentCommCenter} />
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
              active_journal_name.nodeValue === "учета донесений и распоряжений"
            ) {
              this.setState({
                currentJournal: (
                  <DoneseniiTables commCenter={this.state.currentCommCenter} />
                ),
              });
            } else if (
              active_journal_name.nodeValue ===
              "учёта параметров процесса транспортирования горючего"
            ) {
              this.setState({
                currentJournal: (
                  <FuelTables commCenter={this.state.currentCommCenter} />
                ),
              });
            }
          });
        }
      }, 2000);
    }
  }

  render() {
    console.log("render");
    const { classes, error, loading } = this.props;
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
      <ThemeProvider theme={theme}>
        <div style={{ margin: 20 }}>
          <Grid container spacing={2} style={{ width: "90vw" }}>
            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <ListJournals />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paperJournal}>
                {this.state.currentJournal}
              </Paper>
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
