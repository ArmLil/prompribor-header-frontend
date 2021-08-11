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
  handleEditDialogClose,
  handleEdit,
  openEditDialog,
  params,
}) {
  const classes = useStyles();
  const [date, setDate] = React.useState(params.date || "");
  const [time, setTime] = React.useState(params.time || "");
  const [fromWho, setFromWho] = React.useState(params.fromWho || "");
  const [donesenii, setDonesenii] = React.useState(params.donesenii || "");
  const [executor, setExecutor] = React.useState(params.executor || "");
  const [note, setNote] = React.useState(params.note || "");
  const [donesenii_shrink, setDonesenii_shrink] = React.useState(false);
  const [donesenii_error, setDonesenii_error] = React.useState(false);
  const [donesenii_helperText, setDonesenii_helperText] = React.useState("");

  React.useEffect(() => {
    const setParams = () => {
      if (params.date) {
        if (date === "") {
          var newdate = params.date.split("-").reverse().join("-");
          setDate(newdate);
        }
        if (params.time) setTime(params.time);
        else setTime("");
        if (params.fromWho) setFromWho(params.fromWho);
        else setFromWho("");
        if (params.donesenii) setDonesenii(params.donesenii);
        else setDonesenii("");
        if (params.executor) setExecutor(params.executor);
        else setExecutor("");
        if (params.note) setNote(params.note);
        else setNote("");
      }
    };
    setParams();
  }, [date, params]);
  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  const handleChangeFromWho = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromWho(event.target.value);
  };
  const handleChangeDonesenii = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDonesenii(event.target.value);
  };
  const handleChangeExecutor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExecutor(event.target.value);
  };
  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  return (
    <div>
      <Dialog
        open={openEditDialog}
        onClose={handleEditDialogClose}
        PaperComponent={PaperComponent}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Донесение, распоряжение
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пожалуйста, редактируйте необходимые поля.
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
          />
          <TextField
            id="fromWho"
            value={fromWho}
            onChange={handleChangeFromWho}
            label="От кого поступило донесение, распоряжение"
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="donesenii"
            value={donesenii}
            onChange={handleChangeDonesenii}
            onClick={() => {
              // setDonesenii_shrink(true);
            }}
            multiline
            label="Содержание донесения, распоряжения"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={donesenii_helperText}
            error={donesenii_error}
          />
          <TextField
            id="executor"
            value={executor}
            onChange={handleChangeExecutor}
            multiline
            label="Исполнитель"
            helperText="не обязательно"
            style={{ padding: 8 }}
            margin="dense"
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
          <Button onClick={handleEditDialogClose} color="primary">
            Отменить
          </Button>
          <Button
            onClick={(ev) => {
              if (donesenii === "") {
                setDonesenii_shrink(true);
                setDonesenii_error(true);
                setDonesenii_helperText("поле обязательно для заполнения");
                return;
              } else {
                setDonesenii_error(false);
              }
              handleEdit(
                ev,
                date,
                time,
                fromWho,
                donesenii,
                executor,
                note,
                params.id
              );
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
