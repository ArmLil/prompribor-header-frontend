import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  cell: {
    borderLeft: "solid #E6E4E7 2px",
    borderRight: "solid #E6E4E7 2px",
    borderBottom: "solid #E6E4E7 2px",
  },
  headerCell: {
    borderLeft: "solid #D79E45 2px",
    borderRight: "solid #D79E45 2px",
  },
  head: {
    color: "#F7F6F4",
    border: "solid #D79E45 2px",
  },
});

function createData(name: string, note: number, state: number, move: any) {
  return { name, note, state, move };
}

const rows = [
  createData("Москва", 159, 6.0, 24, 4.0),
  createData("Иваново", 237, 9.0, 37, 4.3),
  createData("Санкт-Петербург", 262, 16.0, 24, 6.0),
];

export default function DenseTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <caption
          style={{
            captionSide: "top",
          }}
        >
          Последние уведомления
        </caption>
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>Локация</TableCell>
            <TableCell align="right" className={classes.headerCell}>
              Уведомление
            </TableCell>
            <TableCell align="right" className={classes.headerCell}>
              Состояние
            </TableCell>
            <TableCell align="right" className={classes.headerCell}>
              Перейти
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow hover key={row.name}>
              <TableCell component="th" scope="row" className={classes.cell}>
                {row.name}
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                {row.note}
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                {row.state}
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                {row.move}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
