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
import { getCommCenters } from "../../../../../actions/commCenters";
import { addJournalData } from "../../../../../actions/commCenters";
import { editJournalData } from "../../../../../actions/commCenters";
import { deleteJournalData } from "../../../../../actions/commCenters";

import { useDispatch, useSelector } from "react-redux";

import AddDialog from "./nasosi.addDialog";
import EditDialog from "./nasosi.editDialog";
import TablePaginationActions from "../tablePaginationActions";
import WorningDialog from "../WorningDialog";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    maxHeight: 440,
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
    maxWidth: 280,
  },
  rowP: {
    overflow: "scroll",
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

export default function FuelTables({ commCenter }) {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [parameters, setParameters] = React.useState({});
  const [openWorning, setOpenWorning] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const commCenters = useSelector((state) => state.commCentersReducer.items);

  React.useEffect(() => {
    const setParams = () => {};
    setParams();
  }, [commCenter]);

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
        .deleteData(`nasosi_journals_data/${parameters.id}`)
        .then((result) => {
          console.log({ result });
          dispatch(
            // editJournalData(commCenters, commCenterPath, journalName, journalData)
            deleteJournalData(
              commCenters,
              commCenter.path,
              "nasosi",
              parameters.id
            )
          );
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
    let putBody = {};
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
      .putData(`nasosi_journals_data/${paramsId}`, putBody)
      .then((result) => {
        console.log({ result });
        dispatch(
          // editJournalData(commCenters, commCenterPath, journalName, journalData)
          editJournalData(commCenters, commCenter.path, "nasosi", result.data)
        );
        setOpenEditDialog(false);
      })
      .catch((err) => console.log({ err }));
  };

  const handleCreate = (
    ev,
    date,
    time,
    temperature,
    density,
    current_volume,
    current_mass,
    total_volume,
    total_mass,
    note
  ) => {
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
      .postData("nasosi_journals_data", {
        date,
        time,
        temperature,
        density,
        current_volume,
        current_mass,
        total_volume,
        total_mass,
        note,
        commCenterPath: commCenter.path,
      })
      .then((result) => {
        dispatch(
          // addJournalData(commCenters, commCenterPath, journalName, journalData)
          addJournalData(commCenters, commCenter.path, "nasosi", result.data)
        );
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
              <TableCell className={classes.headerCell}>
                <p className={classes.p}>Температура</p>
                <p className={classes.p}>°С</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Плотность (кг/м3)</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Текущий объемный расход(м3/ч)</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Текущий массовый расход(кг/ч)</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Сумматор объема (литры)</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Сумматор массы (кг)</p>
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
            {commCenter.nasosi_journal_data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
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
                    {row.temperature}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.density}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.current_volume}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.current_mass}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.total_volume}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.total_mass}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.note}
                  </TableCell>
                  <TableCell
                    align="center"
                    className={classes.rowEditDeleteCell}
                  >
                    <IconButton
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={commCenter.nasosi_journal_data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
