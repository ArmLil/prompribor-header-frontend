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
  container: {
    padding: 20,
  },
  headerCell: {
    padding: 5,
    margin: 0,
    border: "solid black 2px",
    fontWeight: "bold",
    fontSize: 14,
  },
  headerCellEdit: {
    padding: 5,
    margin: 0,
    border: "solid black 2px",
    fontWeight: "bold",
    fontSize: 14,
    width: 20,
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

function NasosiTable({ commCenter }) {
  const classes = useStyles();

  let commCenters = [1, 2, 3, 4, 5];

  return (
    <TableContainer className={classes.container}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow key="row1">
            <TableCell className={classes.headerCell} colSpan={7}>
              <p className={classes.p}>{commCenter.name}</p>
            </TableCell>
            <TableCell
              align="center"
              className={classes.headerCellEdit}
              rowSpan={2}
            >
              <p className={classes.p}>Редакт.</p>
            </TableCell>
            <TableCell
              align="center"
              className={classes.headerCellEdit}
              rowSpan={2}
            >
              <p className={classes.p}>Удалить</p>
            </TableCell>
          </TableRow>
          <TableRow key="row2">
            <TableCell className={classes.headerCell}>
              <p className={classes.p}>Дата</p>
            </TableCell>
            <TableCell className={classes.headerCell}>
              <p className={classes.p}>Время</p>
              <p className={classes.p}>(ч. мин.)</p>
            </TableCell>
            <TableCell className={classes.headerCell}>
              <p className={classes.p}>Линия</p>
              <p className={classes.p}>ПМТП</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Рвх.</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Рвых.</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Обороты</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Примечание</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commCenters.map((row, index) => (
            <TableRow key={index}>
              <TableCell className={classes.rowCell}>{}</TableCell>
              <TableCell align="center" className={classes.rowCell}>
                {}
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                {}
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                {}
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                {}
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                {}
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                {}
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                {}
              </TableCell>
              <TableCell align="center" className={classes.rowCell}>
                {}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function NasosiTables({ commCenters }) {
  return commCenters.map((commCenter, index) => {
    return <NasosiTable key={index} commCenter={commCenter} />;
  });
}
