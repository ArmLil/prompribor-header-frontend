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
import dataService from "../../../../services/data.service";
import { editJournalData } from "../../../../actions/currentCommCenter";
import { deleteJournalData } from "../../../../actions/currentCommCenter";

import { useDispatch, useSelector } from "react-redux";

import AddDialog from "./user.addDialog";
import EditDialog from "./user.editDialog";
import TablePaginationActions from "../tablePaginationActions";
import WorningDialog from "../WorningDialog";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fdf9f7",

    // maxHeight: 440,
    // maxWidth: "90vw",
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

export default function UserTable() {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [parameters, setParameters] = React.useState({});
  const [openWorning, setOpenWorning] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const commCenter = useSelector(
    (state) => state.currentCommCenterReducer.item
  );
  const user = useSelector((state) => state.authReducer.user);
  console.log({ user });

  React.useEffect(() => {
    const getUsers = () => {
      dataService
        .getData(`users?token=${user.token}`)
        .then((result) => {
          setUsers(result.data.users.rows);
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.message) {
            alert(err.response.data.message);
          }
          console.log({ err });
        });
    };
    getUsers();
  }, [user.token]);

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

  const handleDeleteWorningOpen = (parameters) => {
    setOpenWorning(true);
    setParameters(Object.assign({}, parameters));
  };

  const handleDeleteWorningClose = (action, parameters) => {
    setOpenWorning(false);
    if (action === "submit") {
      dataService
        .deleteData(`fuel_journals_data/${parameters.id}?token=${user.token}`)
        .then((result) => {
          dispatch(deleteJournalData(commCenter, "fuel", parameters.id));
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
    temperature,
    density,
    current_volume,
    current_mass,
    total_volume,
    total_mass,
    note,
    paramsId
  ) => {
    let putBody = {
      token: user.token,
    };
    if (date) putBody.date = date;
    if (time) putBody.time = time;
    if (temperature) putBody.temperature = temperature;
    if (density) putBody.density = density;
    if (current_volume) putBody.current_volume = current_volume;
    if (current_mass) putBody.current_mass = current_mass;
    if (total_volume) putBody.total_volume = total_volume;
    if (total_mass) putBody.total_mass = total_mass;
    if (note) putBody.note = note;
    putBody.commCenterPath = commCenter.path;
    dataService
      .putData(`fuel_journals_data/${paramsId}`, putBody)
      .then((result) => {
        dispatch(editJournalData(commCenter, "fuel", result.data));
        setOpenEditDialog(false);
      })
      .catch((err) => console.log({ err }));
  };

  const handleCreate = (newUser) => {
    const _users = [...users, newUser];
    setUsers(_users);
  };

  console.log({ users });
  return (
    <div>
      <AddDialog
        handleAddDialogClose={handleAddDialogClose}
        handleCreate={handleCreate}
        openAddDialog={openAddDialog}
        user={user}
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
                <p className={classes.p}>Имя</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "2px" }}
              >
                <p className={classes.p}>Фамилия</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Отчество</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Никнейм</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Должность</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Права админа</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>почта</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Телефон</p>
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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((_user, index) => (
                <TableRow
                  key={index}
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  overflow="hidden"
                >
                  <TableCell align="center" className={classes.rowCell}>
                    {_user.name}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {_user.secondName}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {_user.fatherName}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {_user.username}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {_user.position}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {_user.isAdmin ? "да" : "нет"}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {_user.email}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {_user.phone}
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
                        handleEditDialogOpen(user);
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
                      onClick={() => handleDeleteWorningOpen(user)}
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
                count={users.length}
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