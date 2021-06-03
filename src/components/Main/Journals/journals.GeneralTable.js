import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import Typography from "@material-ui/core/Typography";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

const useStyles = makeStyles({
  headerCell: {
    padding: 5,
    margin: 0,
    border: "solid black 2px",
    fontWeight: "bold",
    fontSize: 14,
  },
  rowCell: {
    padding: 10,
    margin: 0,
    border: "solid black 1px",
  },
  p: {
    margin: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function JournalsGeneralTable() {
  const classes = useStyles();

  let journalGeneralRows = [1, 2, 3, 4, 5];

  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell}>
              <p className={classes.p}>Дата</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Время</p>
              <p className={classes.p}>(ч. мин.)</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>От кого поступило</p>
              <p className={classes.p}>донесение и распорежение</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Содержание донесения,</p>
              <p className={classes.p}>и распорежения</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Кому передано</p>
              <p className={classes.p}>на исполнение</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Отметка об исполнении</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Роспись диспетчера</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {journalGeneralRows.map((row) => (
            <TableRow hover key={row.path}>
              <TableCell className={classes.rowCell}>
                <p className={classes.p}>{}</p>
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                <p className={classes.p}>{}</p>
                <p className={classes.p}>{}</p>
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                <p className={classes.p}>{}</p>
                <p className={classes.p}>{}</p>
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                <p className={classes.p}>{}</p>
                <p className={classes.p}>{}</p>
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                <p className={classes.p}>{}</p>
                <p className={classes.p}>{}</p>
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                <p className={classes.p}>{}</p>
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                <p className={classes.p}>{}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
