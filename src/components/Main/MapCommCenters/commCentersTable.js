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
  cell: {
    padding: 5,
    margin: 0,
    borderLeft: "solid #E6E4E7 2px",
    borderRight: "solid #E6E4E7 2px",
    borderBottom: "solid #E6E4E7 2px",
    maxWidth: 300,
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
  move: {
    padding: 0,
    minWidth: "44px",
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
            <TableCell
              align="center"
              className={classes.headerCell}
              style={{ whiteSpace: "normal" }}
            >
              Описание
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              Статус
            </TableCell>
            <TableCell
              align="center"
              className={classes.headerCell}
              style={{ padding: 2 }}
            >
              Перейти
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {commCenters.map((row) => (
            <TableRow hover key={row.path}>
              <TableCell scope="row" className={classes.cell}>
                {row.name}
              </TableCell>

              <TableCell align="center" className={classes.cell}>
                <Typography style={{ overflowX: "hidden" }}>
                  {" "}
                  {row.description}{" "}
                </Typography>
              </TableCell>
              <TableCell align="center" className={classes.cell}>
                <StopRoundedIcon
                  style={{
                    color: row.status === "offline" ? "#d50000" : "#64dd17",
                  }}
                />
              </TableCell>
              <TableCell
                align="center"
                className={classes.cell}
                style={{ padding: 2 }}
              >
                <Button
                  href={`/main/monitoring/${row.path}`}
                  variant="outlined"
                  size="small"
                  className={classes.move}
                >
                  <ArrowForwardOutlinedIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
