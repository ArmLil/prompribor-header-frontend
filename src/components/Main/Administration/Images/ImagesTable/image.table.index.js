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

import AddDialog from "./image.addDialog";
import EditDialog from "./image.editDialog";
import TablePaginationActions from "../../../tablePaginationActions";
import WorningDialog from "../../../WorningDialog";

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

export default function ImageTable() {
  const classes = useStyles();
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [imageParams, setImageParams] = React.useState({});
  const [openWorning, setOpenWorning] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [images, setImages] = React.useState([]);

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
    setImageParams(Object.assign({}, row, { token: user.token }));
  };

  const handleDeleteWorningClose = (action, parameters) => {
    console.log({ parameters });
    setOpenWorning(false);
    if (action === "submit") {
      console.log("delete submit");
      dataService
        .deleteData(`images/${parameters.id}?token=${user.token}`)
        .then((result) => {
          dataService.getData(`images?token=${user.token}`).then((result) => {
            console.log({ result });
          });
        })
        .catch((err) => {
          let error = err;
          if (err.response && err.response.data) {
            error = err.response.data.message;
          }
          alert(error);
          console.log({ err });
        });
    }
  };

  const handleEditDialogOpen = (row) => {
    setImageParams(Object.assign({}, row, { token: user.token }));
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
        imageParams={imageParams}
      />
      <WorningDialog
        openWorning={openWorning}
        parameters={imageParams}
        handleClose={handleDeleteWorningClose}
        text="Вы действительно хотите удалить изображение?"
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
                <p className={classes.p}>Изоброжение</p>
              </TableCell>
              <TableCell
                className={classes.headerCell}
                style={{ padding: "4px" }}
              >
                <p className={classes.p}>Краткое название</p>
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
            {images
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((img, index) => {
                let backgroundColor = "white";
                return (
                  <TableRow
                    key={index}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    overflow="hidden"
                    style={{ backgroundColor }}
                  >
                    <TableCell align="center" className={classes.rowCell}>
                      {img.url}
                    </TableCell>
                    <TableCell align="center" className={classes.rowCell}>
                      {img.name}
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
                          handleEditDialogOpen(img);
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
                        onClick={() => handleDeleteWorningOpen(img)}
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
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={images.length}
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
