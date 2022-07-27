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

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { getCurrentCommCenter } from "../../../../../actions/currentCommCenter";

import AddDialog from "./nasosi.addDialog";
import EditDialog from "./nasosi.editDialog";
import TablePaginationActions from "../tablePaginationActions";
import WorningDialog from "../WorningDialog";

const useStyles = makeStyles({
  container: {
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
    padding: 5,
    margin: 0,
    border: "solid black 1px",
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
    margin: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function NasosiTables() {
  const commCenter = useSelector(
    (state) => state.currentCommCenterReducer.item
  );
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const rowsPerPageOptions = [5, 10, 25, { label: "Все", value: -1 }];

  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [parameters, setParameters] = React.useState({});
  const [openWorning, setOpenWorning] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authReducer.user);

  React.useEffect(() => {
    const setPageLimit = () => {
      let _rowsPerPage = +commCenter.nasosi.limit;
      if (+commCenter.nasosi.limit === +commCenter.nasosi.count) {
        _rowsPerPage = -1;
      }
      setRowsPerPage(_rowsPerPage);
      const offset = +commCenter.nasosi.offset;
      setPage(Math.floor(offset / +commCenter.nasosi.limit));
    };
    setPageLimit();
  }, [
    commCenter.nasosi.limit,
    commCenter.nasosi.offset,
    commCenter.nasosi.count,
  ]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    const newLocationSearch = `?page=${newPage}&limit=${rowsPerPage}`;
    history.push(`${location.pathname}${newLocationSearch}`);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let newLimit = parseInt(event.target.value, 10);
    if (newLimit < 0) {
      setRowsPerPage(parseInt(event.target.value, 10));
      newLimit = commCenter.nasosi.count;
    }
    const newLocationSearch = `?page=0&limit=${newLimit}`;
    history.push(`${location.pathname}${newLocationSearch}`);
  };

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleDeleteWorningOpen = (parameters) => {
    setOpenWorning(true);
    setParameters(Object.assign({}, parameters));
  };

  const handleDeleteWorningClose = (action, parameters) => {
    setOpenWorning(false);
    if (action === "submit") {
      dataService
        .deleteData(`nasosi/${parameters.id}?token=${user.token}`)
        .then((result) => {
          const fetchCommCenterUrl = `commCenters/commCenterByPath/${
            params.commCenterPath
          }?offset=${+commCenter.nasosi.offset}&limit=${+commCenter.nasosi
            .limit}&nasosi=true`;
          dispatch(getCurrentCommCenter(fetchCommCenterUrl, commCenter));
        })
        .catch((err) => console.log({ err }));
    }
  };

  const handleEditDialogOpen = (parameters) => {
    setParameters(Object.assign({}, parameters));
    setOpenEditDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };
  const handleEditDialogClose = (parameters) => {
    setOpenEditDialog(false);
  };

  const handleEdit = (
    ev,
    date,
    time,
    line,
    P_in,
    P_out,
    revs,
    note,
    paramsId
  ) => {
    let putBody = {
      token: user.token,
    };
    if (date) putBody.date = date;
    if (time) putBody.time = time;
    if (line) putBody.line = line;
    if (P_in) putBody.P_in = P_in;
    if (P_out) putBody.P_out = P_out;
    if (revs) putBody.revs = revs;
    if (note) putBody.note = note;
    putBody.commCenterId = commCenter.id;
    dataService
      .putData(`nasosi/${paramsId}`, putBody)
      .then((result) => {
        const fetchCommCenterUrl = `commCenters/commCenterByPath/${
          params.commCenterPath
        }?offset=${+commCenter.nasosi.offset}&limit=${+commCenter.nasosi
          .limit}&nasosi=true`;
        dispatch(getCurrentCommCenter(fetchCommCenterUrl, commCenter));
        setOpenEditDialog(false);
      })
      .catch((err) => console.log({ err }));
  };

  const handleCreate = (ev, date, time, line, P_in, P_out, revs, note) => {
    if (date === "") {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = dd + "-" + mm + "-" + yyyy;
      date = today;
    } else {
      let formateDate = new Date(date);
      let dd = String(formateDate.getDate()).padStart(2, "0");
      let mm = String(formateDate.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = formateDate.getFullYear();
      formateDate = dd + "-" + mm + "-" + yyyy;
      date = formateDate;
    }
    if (time === "") {
      let today = new Date();
      let hh = String(today.getHours());
      let min = String(today.getMinutes());

      if (hh.length === 1) hh = "0" + hh;
      if (min.length === 1) min = "0" + min;
      let currentTime = hh + ":" + min;
      time = currentTime;
    }
    dataService
      .postData("nasosi", {
        date,
        time,
        line,
        P_in,
        P_out,
        revs,
        note,
        commCenterId: commCenter.id,
        token: user.token,
      })
      .then((result) => {
        const fetchCommCenterUrl = `commCenters/commCenterByPath/${
          params.commCenterPath
        }?offset=${+commCenter.nasosi.offset}&limit=${+commCenter.nasosi
          .limit}&nasosi=true`;
        dispatch(getCurrentCommCenter(fetchCommCenterUrl, commCenter));
        setOpenAddDialog(false);
      })
      .catch((err) => console.log({ err }));
  };

  return (
    <div>
      <AddDialog
        handleAddDialogClose={handleAddDialogClose}
        handleCreate={handleCreate}
        openAddDialog={openAddDialog}
      />
      <EditDialog
        handleEditDialogClose={handleEditDialogClose}
        handleEdit={handleEdit}
        openEditDialog={openEditDialog}
        params={parameters}
      />
      <WorningDialog
        openWorning={openWorning}
        parameters={parameters}
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
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow key="row1">
              <TableCell className={classes.headerCell} colSpan={9}>
                <p className={classes.p}>{commCenter.name}</p>
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
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Рвх. (Мпа)</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Рвых. (Мпа)</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Обороты</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Примечание</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCellEdit}>
                <p className={classes.p}>Редакт.</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCellEdit}>
                <p className={classes.p}>Удалить</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commCenter.nasosi.rows.map((row, index) => {
              return (
                <TableRow
                  key={row.id}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  overflow="hidden"
                >
                  <TableCell align="center" className={classes.rowCell}>
                    {row.date}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.time}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.P_in}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.P_out}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.revs}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.note}
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
                        handleEditDialogOpen(row);
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
                      onClick={() => handleDeleteWorningOpen(row)}
                    >
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                colSpan={3}
                count={+commCenter.nasosi.count}
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
