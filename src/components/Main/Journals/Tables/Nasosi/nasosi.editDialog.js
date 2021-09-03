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
  const [line, setLine] = React.useState(params.line || "");
  const [P_in, setP_in] = React.useState(params.P_in || "");
  const [P_out, setP_out] = React.useState(params.P_out || "");
  const [revs, setRevs] = React.useState(params.revs || "");
  const [note, setNote] = React.useState(params.note || "");

  React.useEffect(() => {
    const setParams = () => {
      if (params.date) {
        if (date === "") {
          var newdate = params.date.split("-").reverse().join("-");
          setDate(newdate);
        }
        if (params.time) setTime(params.time);
        else setTime("");
        if (params.line) setLine(params.line);
        else setLine("");
        if (params.P_in) setP_in(params.P_in);
        if (params.P_out) setP_out(params.P_out);
        else setP_out("");
        if (params.revs) setRevs(params.revs);
        else setRevs("");
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
  const handleChangeLine = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLine(event.target.value);
  };
  const handleChangeP_in = (event: React.ChangeEvent<HTMLInputElement>) => {
    setP_in(event.target.value);
  };
  const handleChangeP_out = (event: React.ChangeEvent<HTMLInputElement>) => {
    setP_out(event.target.value);
  };
  const handleChangeRevs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRevs(event.target.value);
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
          Режим работы насосных станций
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
            id="line"
            value={line}
            onChange={handleChangeLine}
            label="Линия ПМТП"
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="P_in"
            value={P_in}
            onChange={handleChangeP_in}
            multiline
            label="Рвх."
            style={{ padding: 8 }}
            margin="dense"
            required
          />
          <TextField
            id="P_out"
            value={P_out}
            onChange={handleChangeP_out}
            multiline
            label="Рвых."
            style={{ padding: 8 }}
            margin="dense"
            required
          />
          <TextField
            id="revs"
            value={revs}
            onChange={handleChangeRevs}
            multiline
            label="Обороты"
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
              handleEdit(
                ev,
                date,
                time,
                line,
                P_in,
                P_out,
                revs,
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
