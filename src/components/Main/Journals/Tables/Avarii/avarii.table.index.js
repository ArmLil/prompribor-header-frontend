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

import AddDialog from "./avarii.addDialog";
import EditDialog from "./avarii.editDialog";
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
    margin: 0,
    border: "solid black 1px",
    maxWidth: 280,
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

export default function AvariiTables() {
  const commCenter = useSelector(
    (state) => state.currentCommCenterReducer.item
  );
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const rowsPerPageOptions = [5, 10, 25, { label: "??????", value: -1 }];

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
      let _rowsPerPage = +commCenter.avarii.limit;
      if (+commCenter.avarii.limit === +commCenter.avarii.count) {
        _rowsPerPage = -1;
      }
      setRowsPerPage(_rowsPerPage);
      const offset = +commCenter.avarii.offset;
      setPage(Math.floor(offset / +commCenter.avarii.limit));
    };
    setPageLimit();
  }, [
    commCenter.avarii.limit,
    commCenter.avarii.offset,
    commCenter.avarii.count,
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
      newLimit = commCenter.avarii.count;
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
        .deleteData(`avarii/${parameters.id}?token=${user.token}`)
        .then((result) => {
          const fetchCommCenterUrl = `commCenters/commCenterByPath/${
            params.commCenterPath
          }?offset=${+commCenter.avarii.offset}&limit=${+commCenter.avarii
            .limit}&avarii=true`;
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
    fromWho,
    avarii,
    executor,
    note,
    paramsId
  ) => {
    let putBody = {
      token: user.token,
    };
    if (date) putBody.date = date;
    if (time) putBody.time = time;
    if (fromWho) putBody.fromWho = fromWho;
    if (avarii) putBody.avarii = avarii;
    if (executor) putBody.executor = executor;
    if (note) putBody.note = note;
    putBody.commCenterId = commCenter.id;
    dataService
      .putData(`avarii/${paramsId}`, putBody)
      .then((result) => {
        const fetchCommCenterUrl = `commCenters/commCenterByPath/${
          params.commCenterPath
        }?offset=${+commCenter.avarii.offset}&limit=${+commCenter.avarii
          .limit}&avarii=true`;
        dispatch(getCurrentCommCenter(fetchCommCenterUrl, commCenter));
        setOpenEditDialog(false);
      })
      .catch((err) => console.log({ err }));
  };

  const handleCreate = (ev, date, time, fromWho, avarii, executor, note) => {
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
      .postData("avarii", {
        date,
        time,
        fromWho,
        avarii,
        executor,
        note,
        commCenterId: commCenter.id,
        token: user.token,
      })
      .then((result) => {
        if (result.data.message) {
          throw new Error(result.data.message);
        }
        const fetchCommCenterUrl = `commCenters/commCenterByPath/${
          params.commCenterPath
        }?offset=${+commCenter.avarii.offset}&limit=${+commCenter.avarii
          .limit}&avarii=true`;
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
        <Tooltip title="?????????????? ?????????? ??????????????">
          <Button
            disabled={!user.isAdmin}
            variant="contained"
            color="primary"
            onClick={handleAddDialogOpen}
            className={classes.addButton}
          >
            ??????????????
          </Button>
        </Tooltip>
        <Table stickyHeader size="small" aria-label="sticky table">
          <TableHead>
            <TableRow key="row1">
              <TableCell className={classes.headerCell} colSpan={8}>
                <p className={classes.p}>{commCenter.name}</p>
              </TableCell>
            </TableRow>
            <TableRow key="row2">
              <TableCell className={classes.headerCell}>
                <p className={classes.p}>????????</p>
              </TableCell>
              <TableCell className={classes.headerCell}>
                <p className={classes.p}>??????????</p>
                <p className={classes.p}>(??. ??????.)</p>
              </TableCell>
              <TableCell className={classes.headerCell}>
                <p className={classes.p}>???? ???????? ?????????????????? </p>
                <p className={classes.p}>???????????????????? ???? ????????????</p>
              </TableCell>
              <TableCell
                align="center"
                className={classes.headerCell}
                style={{ marginLeft: "15px", marginRight: "10px" }}
              >
                <p className={classes.p}>????????????????????</p>
                <p className={classes.p}>(??????????, ?????????????????? ?????????????? ????????????)</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>???????? ????????????????</p>
                <p className={classes.p}>???? ????????????????????</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>??????????????</p>
                <p className={classes.p}>???? ????????????????????</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCellEdit}>
                <p className={classes.p}>????????????.</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCellEdit}>
                <p className={classes.p}>??????????????</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commCenter.avarii.rows.map((row, index) => (
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
                  {row.fromWho}
                </TableCell>
                <TableCell align="center" className={classes.rowCell}>
                  {row.avarii}
                </TableCell>
                <TableCell align="center" className={classes.rowCell}>
                  {row.executor}
                </TableCell>
                <TableCell align="center" className={classes.rowCell}>
                  {row.note}
                </TableCell>
                <TableCell align="center" className={classes.rowEditDeleteCell}>
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
                <TableCell align="center" className={classes.rowEditDeleteCell}>
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
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                colSpan={3}
                count={+commCenter.avarii.count}
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
