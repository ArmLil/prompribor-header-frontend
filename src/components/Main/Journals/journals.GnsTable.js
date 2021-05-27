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
  table: {
    // maxWidth: 50,
  },
  head: {
    // border: "solid black 2px",
  },
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

export default function JournalsGnsTable() {
  const classes = useStyles();

  let commCenters = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <TableContainer>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.headerCell} rowSpan={2}>
              <p className={classes.p}>Дата</p>
            </TableCell>
            <TableCell className={classes.headerCell} rowSpan={2}>
              <p className={classes.p}>Время</p>
              <p className={classes.p}>(ч. мин.)</p>
            </TableCell>
            <TableCell className={classes.headerCell} rowSpan={2}>
              <p className={classes.p}>Линия</p>
              <p className={classes.p}>ПМТП</p>
            </TableCell>
            <TableCell
              align="center"
              className={classes.headerCell}
              colSpan={3}
            >
              <p className={classes.p}>ГНС-1</p>
            </TableCell>
            <TableCell
              align="center"
              className={classes.headerCell}
              rowSpan={2}
            >
              <p className={classes.p}>Прим.</p>
            </TableCell>
            <TableCell
              align="center"
              className={classes.headerCell}
              colSpan={3}
            >
              <p className={classes.p}>ГНС-2</p>
            </TableCell>
            <TableCell
              align="center"
              className={classes.headerCell}
              rowSpan={2}
            >
              <p className={classes.p}>Прим.</p>
            </TableCell>
          </TableRow>
          <TableRow>
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
              <p className={classes.p}>Рвх.</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Рвых.</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Обороты</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commCenters.map((row) => (
            <TableRow>
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
