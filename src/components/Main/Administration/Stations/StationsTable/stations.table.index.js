import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import dataService from "../../../../../services/data.service";
import { getMapCommCenters } from "../../../../../actions/mapCommCenters";

import { useDispatch, useSelector } from "react-redux";

import AddDialog from "./station.addDialog";
import EditDialog from "./station.editDialog";
import TablePaginationActions from "../tablePaginationActions";
import WorningDialog from "../WorningDialog";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fdf9f7",

    // maxHeight: 440,
    // maxWidth: "87vw",
  },
  table: {
    marginTop: 50,
    marginBottom: 50,
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
    // padding: 5,
    // maxWidth: 300,
    width: 150,
    margin: 0,
    border: "solid black 1px",
    fontWeight: "bold",
    fontSize: 14,
  },
  headerCellEdit: {
    padding: 5,
    margin: 0,
    border: "solid black 1px",
    fontWeight: "bold",
    fontSize: 14,
    width: 20,
  },
  rowCell: {
    // padding: 5,
    margin: 0,
    border: "solid black 1px",
    // maxWidth: 280,
    whiteSpace: "initial",
  },
  rowEditDeleteCell: {
    padding: 5,
    border: "solid black 1px",
  },
  iconButton: {
    padding: 5,
  },
  p: {
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const renamePosition = (position) => {
  let result = "";
  switch (position) {
    case "top":
      result = "верх";
      break;
    case "top-left":
      result = "верх-лево";
      break;
    case "top-right":
      result = "верх-право";
      break;
    case "bottom":
      result = "вниз";
      break;
    case "bottom-left":
      result = "вниз-лево";
      break;
    case "bottom-right":
      result = "вниз-право";
      break;
    case "left":
      result = "лево";
      break;
    case "right":
      result = "право";
      break;
    default:
      result = "вниз";
  }
  return result;
};

export default function UserTable() {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [stationParams, setStationParams] = React.useState({});
  const [openWorning, setOpenWorning] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch();

  const mapCommCenters = useSelector(
    (state) => state.mapCommCentersReducer.items
  );

  const user = useSelector((state) => state.authReducer.user);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleDeleteWorningOpen = (row) => {
    setOpenWorning(true);
    setStationParams(Object.assign({}, row, { token: user.token }));
  };

  const handleDeleteWorningClose = (action, parameters) => {
    setOpenWorning(false);
    if (action === "submit") {
      dataService
        .deleteData(`commCenters/${parameters.id}?token=${user.token}`)
        .then((result) => {
          dispatch(getMapCommCenters("mapCommCenters")).catch((err) => {
            console.log({ err });
          });
        })
        .catch((err) => {
          let error = err;
          console.log(err.response);
          if (err.response && err.response.data) {
            error = err.response.data;
          }
          alert(error);
          console.log({ err });
        });
    }
  };

  const handleEditDialogOpen = (row) => {
    setStationParams(Object.assign({}, row, { token: user.token }));
    setOpenEditDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };
  const handleEditDialogClose = (parameters) => {
    setOpenEditDialog(false);
  };

  return (
    <div>
      <AddDialog
        openAddDialog={openAddDialog}
        handleAddDialogClose={handleAddDialogClose}
        user={user}
      />
      <EditDialog
        handleEditDialogClose={handleEditDialogClose}
        openEditDialog={openEditDialog}
        stationParams={stationParams}
      />
      <WorningDialog
        openWorning={openWorning}
        parameters={stationParams}
        handleClose={handleDeleteWorningClose}
      />
      <TableContainer className={classes.container}>
        <Tooltip title="Создать новый элемент">
          <Button
            disabled={!user.isAdmin}
            variant="contained"
            color="primary"
            onClick={handleAddDialogOpen}
            className={classes.addButton}
          >
            Создать
          </Button>
        </Tooltip>
        <Table
          stickyHeader
          size="small"
          aria-label="sticky table"
          className={classes.table}
        >
          <TableHead style={{ width: "90vh" }}>
            <TableRow key="row2">
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Идентификатор</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "2px" }}
              >
                <p className={classes.p}>Наименование</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Индекс</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Широта</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Долгота</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Позиция таблицы на карте</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Описание</p>
              </TableCell>

              <TableCell className={classes.headerCellEdit}>
                <p className={classes.p}>Редакт.</p>
              </TableCell>
              <TableCell className={classes.headerCellEdit}>
                <p className={classes.p}>Удалить</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mapCommCenters
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((commCenter, index) => (
                <TableRow
                  key={index}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  overflow="hidden"
                >
                  <TableCell align="center" className={classes.rowCell}>
                    {commCenter.path}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {commCenter.name}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {commCenter.index}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {commCenter.lat}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {commCenter.lon}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {renamePosition(commCenter.tablePosition)}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {commCenter.description}
                  </TableCell>

                  <TableCell
                    align="center"
                    className={classes.rowEditDeleteCell}
                  >
                    <IconButton
                      disabled={!user.isAdmin}
                      aria-label="edit"
                      color="primary"
                      className={classes.iconButton}
                      onClick={() => {
                        handleEditDialogOpen(commCenter);
                      }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.rowEditDeleteCell}
                  >
                    <IconButton
                      disabled={!user.isAdmin}
                      aria-label="delete"
                      color="secondary"
                      className={classes.iconButton}
                      onClick={() => handleDeleteWorningOpen(commCenter)}
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={mapCommCenters.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
