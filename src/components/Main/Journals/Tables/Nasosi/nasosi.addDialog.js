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
  const [P_in, setP_in] = React.useState("");
  const [P_out, setP_out] = React.useState("");
  const [line_error, setLine_error] = React.useState(false);
  const [p_in_error, setP_in_error] = React.useState(false);
  const [p_out_error, setP_out_error] = React.useState(false);
  const [revs_error, setRevs_error] = React.useState(false);
  const [line_helperText, setLine_helperText] = React.useState("");
  const [p_in_helperText, setP_in_helperText] = React.useState("");
  const [p_out_helperText, setP_out_helperText] = React.useState("");
  const [revs_helperText, setRevs_helperText] = React.useState("");
  const [revs, setRevs] = React.useState("");
  const [note, setNote] = React.useState("");

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  const handleChangeLine = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLine(event.target.value);
    setLine_error(false);
  };
  const handleChangeP_in = (event: React.ChangeEvent<HTMLInputElement>) => {
    setP_in(event.target.value);
    setP_in_error(false);
  };
  const handleChangeP_out = (event: React.ChangeEvent<HTMLInputElement>) => {
    setP_out(event.target.value);
    setP_out_error(false);
  };
  const handleChangeRevs = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRevs(event.target.value);
    setRevs_error(false);
  };
  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  const handleOnClose = () => {
    setDate("");
    setTime("");
    setLine("");
    setP_in("");
    setP_out("");
    setRevs("");
    setNote("");
    setLine_error(false);
    setP_in_error(false);
    setP_out_error(false);
    setRevs_error(false);
    setLine_helperText(false);
    setP_in_helperText(false);
    setP_out_helperText(false);
    setRevs_helperText(false);
    handleAddDialogClose();
  };
  return (
    <div>
      <Dialog
        open={openAddDialog}
        onClose={handleOnClose}
        PaperComponent={PaperComponent}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          ?????????? ???????????? ???????????????? ??????????????
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ?????? ???????????????? ???????????? ????????????????, ????????????????????, ?????????????????? ????????.
          </DialogContentText>
          <TextField
            margin="dense"
            id="date"
            value={date}
            onChange={handleChangeDate}
            label="????????"
            type="date"
            style={{ padding: 8 }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="???? ?????????????????????? (?????????????? ???????? ?????????? ?????????????????????? ??????????????????????????)"
          />
          <TextField
            margin="dense"
            id="time"
            value={time}
            onChange={handleChangeTime}
            label="??????????"
            type="time"
            style={{ padding: 8 }}
            InputLabelProps={{
              shrink: true,
            }}
            helperText="???? ?????????????????????? (?????????????? ?????????? ?????????? ?????????????????????? ??????????????????????????)"
          />
          <TextField
            id="line"
            value={line}
            onChange={handleChangeLine}
            label="?????????? ????????"
            style={{ padding: 8 }}
            margin="dense"
            helperText={line_helperText}
            error={line_error}
          />
          <TextField
            id="P_in"
            value={P_in}
            onChange={handleChangeP_in}
            multiline
            label="??????."
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={p_in_helperText}
            error={p_in_error}
          />
          <TextField
            id="P_out"
            value={P_out}
            onChange={handleChangeP_out}
            multiline
            label="????????."
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={p_out_helperText}
            error={p_out_error}
          />
          <TextField
            id="revs"
            value={revs}
            onChange={handleChangeRevs}
            multiline
            label="??????????????"
            required
            helperText={revs_helperText}
            error={revs_error}
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="note"
            value={note}
            onChange={handleChangeNote}
            multiline
            label="????????????????????"
            helperText="???? ??????????????????????"
            style={{ padding: 8 }}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose} color="primary">
            ????????????????
          </Button>
          <Button
            onClick={(ev) => {
              let close = true;
              if (line === "") {
                setLine_error(true);
                setLine_helperText("???????? ?????????????????????? ?????? ????????????????????");
                close = false;
              }
              if (P_in === "") {
                setP_in_error(true);
                setP_in_helperText("???????? ?????????????????????? ?????? ????????????????????");
                close = false;
              }
              if (P_out === "") {
                setP_out_error(true);
                setP_out_helperText("???????? ?????????????????????? ?????? ????????????????????");
                close = false;
              }
              if (revs === "") {
                setRevs_error(true);
                setRevs_helperText("???????? ?????????????????????? ?????? ????????????????????");
                close = false;
              }
              if (close) {
                handleOnClose();
                handleCreate(ev, date, time, line, P_in, P_out, revs, note);
              }
            }}
            color="primary"
          >
            ??????????????????????
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
