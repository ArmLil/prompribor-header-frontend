import React from "react";
import Button from "@material-ui/core/Button";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
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
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableFooter from "@material-ui/core/TableFooter";
import dataService from "../../../../../services/data.service";
import { getCommCenters } from "../../../../../actions/commCenters";
import { addJournalData } from "../../../../../actions/commCenters";

import { useDispatch, useSelector } from "react-redux";

import AddDialog from "./avarii.addDialog";

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

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default function AvariiTables({ commCenter, handleCreateAvarii }) {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);
  const [openWorning, setOpenWorning] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const commCenters = useSelector((state) => state.commCentersReducer.items);

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

  const handleUpdateDialogOpen = (params) => {
    // setParameters(Object.assign({}, params.row));
    setOpenUpdateDialog(true);
  };

  const handleDeleteWorningOpen = (params) => {
    setOpenWorning(true);
    // setParameters(Object.assign({}, params.row));
  };
  const handleAddDialogClose = (params) => {
    setOpenAddDialog(false);
    // setParameters(Object.assign({}, params.row));
  };
  const handleCreate = (ev, date, time, line, avarii, note) => {
    // setOpenAddDialog(false);
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
      let hh = today.getHours();
      let min = today.getMinutes();
      let currentTime = hh + ":" + min;
      time = currentTime;
    }
    dataService
      .postData("avarii_journals_data", {
        date,
        time,
        line,
        avarii,
        note,
        commCenterPath: commCenter.path,
      })
      .then((result) => {
        dispatch(
          // addJournalData(commCenters, commCenterPath, journalName, journalData)
          addJournalData(commCenters, commCenter.path, "avarii", result.data)
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
              <TableCell className={classes.headerCell} colSpan={7}>
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
                <p className={classes.p}>Линия</p>
                <p className={classes.p}>ПМТП</p>
              </TableCell>
              <TableCell align="center" className={classes.headerCell}>
                <p className={classes.p}>Аварии и неисправности</p>
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
            {commCenter.avarii_journal_data
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
                    {row.line}
                  </TableCell>
                  <TableCell align="center" className={classes.rowCell}>
                    {row.avarii}
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
                      onClick={(params) => {
                        handleUpdateDialogOpen(params);
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
                      onClick={(params) => handleDeleteWorningOpen(params)}
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
                count={commCenter.avarii_journal_data.length}
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
