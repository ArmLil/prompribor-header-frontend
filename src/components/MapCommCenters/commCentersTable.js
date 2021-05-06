import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";

const useStyles = makeStyles({
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

export default function CommCentersTable({ commCenters }) {
  const classes = useStyles();

  // let commCenters = props;
  // <caption
  //   style={{
  //     captionSide: "top",
  //   }}
  // >
  //
  //   Последние уведомления
  // </caption>

  return (
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
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
                <Link to={"/main/monitoring"}>
                  <ArrowForwardOutlinedIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
