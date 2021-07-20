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
  handleAddDialogClose,
  handleCreate,
  openAddDialog,
}) {
  const classes = useStyles();
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [line, setLine] = React.useState("");
  const [avarii, setAvarii] = React.useState("");
  const [avarii_shrink, setAvarii_shrink] = React.useState(false);
  const [avarii_error, setAvarii_error] = React.useState(false);
  const [avarii_helperText, setAvarii_helperText] = React.useState("");
  const [note, setNote] = React.useState("");

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  const handleChangeLine = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLine(event.target.value);
  };
  const handleChangeAvarii = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAvarii(event.target.value);
  };
  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  return (
    <div>
      <Dialog
        open={openAddDialog}
        onClose={() => {
          setTime("");
          setLine("");
          setAvarii("");
          setNote("");
          handleAddDialogClose();
        }}
        PaperComponent={PaperComponent}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Аварии и неисправности
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для создания нового элемента, пожалуйста, заполните поля.
          </DialogContentText>
          <TextField
            margin="dense"
            id="date"
            value={date}
            onChange={handleChangeDate}
            label="Дата"
            type="date"
            style={{ padding: 8 }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="не обязательно (текущяя дата может заполняться автоматически)"
          />
          <TextField
            margin="dense"
            id="time"
            value={time}
            onChange={handleChangeTime}
            label="Время"
            type="time"
            style={{ padding: 8 }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="не обязательно (текущяя время может заполняться автоматически)"
          />
          <TextField
            id="line"
            value={line}
            onChange={handleChangeLine}
            label="Линия ПМТП"
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="avarii"
            value={avarii}
            onChange={handleChangeAvarii}
            onClick={() => {
              // setAvarii_shrink(true);
            }}
            multiline
            label="Аварии и неисправности"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={avarii_helperText}
            error={avarii_error}
          />
          <TextField
            id="note"
            value={note}
            onChange={handleChangeNote}
            multiline
            label="Примечание"
            helperText="не обязательно"
            style={{ padding: 8 }}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="primary">
            Отменить
          </Button>
          <Button
            onClick={(ev) => {
              if (avarii === "") {
                setAvarii_shrink(true);
                setAvarii_error(true);
                setAvarii_helperText("поле обязательно для заполнения");
                return;
              } else {
                setAvarii_error(false);
              }
              handleCreate(ev, date, time, line, avarii, note);
              setTime("");
              setLine("");
              setAvarii("");
              setNote("");
            }}
            color="primary"
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
