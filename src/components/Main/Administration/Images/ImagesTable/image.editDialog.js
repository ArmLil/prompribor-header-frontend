import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import dataService from "../../../../../services/data.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "55ch",
        backgroundColor: "#fcfdf4",
      },
    },
  })
);

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function FormDialog({
  handleEditDialogClose,
  openEditDialog,
  imageParams,
}) {
  const classes = useStyles();
  const [name, setName] = React.useState("");

  const [name_error, setName_error] = React.useState(false);

  const [name_helperText, setName_helperText] = React.useState("");

  React.useEffect(() => {
    const setParams = () => {
      if (imageParams.name) setName(imageParams.name);
    };
    if (Object.keys(imageParams).length > 0) {
      setParams();
    }
  }, [imageParams]);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setName_error(false);
  };

  const handleOnClose = () => {
    setName_error(false);
    setName_helperText("");
    handleEditDialogClose();
  };

  const handleSubmit = (id) => {
    console.log("handleSubmit...");
    let close = true;

    if (name === "") {
      setName_error(true);
      setName_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (close) {
      dataService
        .putData(`images/${imageParams.id}`, {
          name,
        })
        .then(() => handleOnClose())
        .catch((err) => {
          console.log({ err });
        });
    }
  };

  return (
    <div>
      <Dialog
        open={openEditDialog}
        onClose={handleOnClose}
        PaperComponent={PaperComponent}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Изоброжение
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пожалуйста, редактируйте необходимые поля.
          </DialogContentText>

          <TextField
            id="name"
            value={name}
            onChange={handleChangeName}
            helperText={name_helperText}
            error={name_error}
            label="Наименование"
            style={{ padding: 8 }}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose} color="primary">
            Отменить
          </Button>
          <Button onClick={() => handleSubmit(imageParams.id)} color="primary">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
