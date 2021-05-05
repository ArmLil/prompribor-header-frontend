import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loader from "../Loader";

import { connect } from "react-redux";
import { getData } from "../../actions/data";

const styles = () => ({
  table: {
    minWidth: 250,
  },
  cell: {
    padding: 5,
    margin: 0,
    borderLeft: "solid #E6E4E7 2px",
    borderRight: "solid #E6E4E7 2px",
    borderBottom: "solid #E6E4E7 2px",
  },
  headerCell: {
    padding: 5,
    margin: 0,
    borderLeft: "solid #D79E45 2px",
    borderRight: "solid #D79E45 2px",
  },
  head: {
    color: "#F7F6F4",
    border: "solid #D79E45 2px",
  },
});

class LastNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCommCenters: [],
    };
  }

  componentDidMount() {
    console.log("this.props", this.props);
    const { commCenters, dispatch } = this.props;
    const getCommCenterUrl = "commCenters?controller=include";

    if (commCenters.length === 0) {
      dispatch(getData(getCommCenterUrl));
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
    // <caption
    //   style={{
    //     captionSide: "top",
    //   }}
    // >
    //
    //   Последние уведомления
    // </caption>
    console.log(commCenters);

    return (
      <TableContainer>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.headerCell}>Локация</TableCell>
              <TableCell align="center" className={classes.headerCell}>
                Описание
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                Статус
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                Перейти
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commCenters.map((row) => (
              <TableRow hover key={row.name}>
                <TableCell scope="row" className={classes.cell}>
                  {row.name}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.description}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.status}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  <Button
                    variant="outlined"
                    color="primary"
                    href="#outlined-buttons"
                    style={{ minWidth: 35, height: 20 }}
                  >
                    >>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

function mapStateToProps(state) {
  console.log({ state });
  const { message } = state.message;
  const commCenters = state.commCentersReducer.items;
  const { error, loading } = state.commCentersReducer;
  return {
    message,
    commCenters,
  };
}
export default connect(mapStateToProps, null)(withStyles(styles)(LastNotes));
