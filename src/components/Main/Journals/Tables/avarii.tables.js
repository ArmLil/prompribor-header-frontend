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
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

const useStyles = makeStyles({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
  },
  addButton: {
    width: 20,
    margin: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 12,
    alignSelf: "flex-end",
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
  rowEditDeleteCell: {
    padding: 5,
    border: "solid black 1px",
  },
  iconButton: {
    padding: 5,
  },
  p: {
    margin: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function AvariiTable({ commCenter }) {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openWorning, setOpenWorning] = React.useState(false);

  let rows = [1, 2, 3, 4, 5];

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleUpdateDialogOpen = (params) => {
    // setParameters(Object.assign({}, params.row));
    setOpenUpdateDialog(true);
  };

  const handleDeleteWorningOpen = (params) => {
    setOpenWorning(true);
    // setParameters(Object.assign({}, params.row));
  };
  return (
    <TableContainer className={classes.container}>
      <Tooltip title="Создать новый элемент">
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddDialogOpen}
          className={classes.addButton}
        >
          Создать
        </Button>
      </Tooltip>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow key="row1">
            <TableCell className={classes.headerCell} colSpan={5}>
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
              <p className={classes.p}>Аварии и неисправности</p>
            </TableCell>
            <TableCell align="center" className={classes.headerCell}>
              <p className={classes.p}>Примечание</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
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
              <TableCell align="center" className={classes.rowEditDeleteCell}>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  className={classes.iconButton}
                  onClick={(params) => {
                    handleUpdateDialogOpen(params);
                  }}
                >
                  <EditOutlinedIcon />
                </IconButton>
              </TableCell>
              <TableCell align="center" className={classes.rowEditDeleteCell}>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  className={classes.iconButton}
                  onClick={(params) => handleDeleteWorningOpen(params)}
                >
                  <DeleteForeverOutlinedIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function AvariiTables({ commCenter }) {
  return <AvariiTable commCenter={commCenter} />;
}
