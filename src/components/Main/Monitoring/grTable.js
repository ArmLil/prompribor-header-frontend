import React from "react";
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      // backgroundColor: theme.palette.common.black,
      backgroundColor: "#ccd0aa",
      // color: theme.palette.common.black,
      // color: theme.palette.common.white,
      borderBottom: "2px solid #3e2723",
      fontSize: 16,
    },
    body: {
      fontSize: 14,
      // border: "2px solid #3e2723",
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: "#fbfbfb",
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

export default function GroupTable({ group }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Адрес регистра</StyledTableCell>
            <StyledTableCell align="center">Размер регистра</StyledTableCell>
            <StyledTableCell align="center">Тип данных</StyledTableCell>
            <StyledTableCell align="center">Назначение</StyledTableCell>
            <StyledTableCell align="center">Значение</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {group.registers.map((row) => {
            return (
              <StyledTableRow key={row.address}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ width: 100 }}
                >
                  {row.address}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 100 }}>
                  {row.sizeRegister}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 100 }}>
                  {row.dataType}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ width: 200 }}>
                  {row.appointment}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{ width: 200, minWidth: 200, maxWidth: 200 }}
                >
                  {row.value}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
