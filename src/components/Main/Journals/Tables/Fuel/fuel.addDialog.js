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
  const [temperature, setTemperature] = React.useState("");
  const [density, setDensity] = React.useState("");
  const [current_volume, setCurrent_volume] = React.useState("");
  const [fuel_shrink, setFuel_shrink] = React.useState(false);
  const [fuel_error, setFuel_error] = React.useState(false);
  const [fuel_helperText, setFuel_helperText] = React.useState("");
  const [current_mass, setCurrent_mass] = React.useState("");
  const [total_volume, setTotal_volume] = React.useState("");
  const [total_mass, setTotal_mass] = React.useState("");
  const [note, setNote] = React.useState("");

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };
  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  const handleChangeTemperature = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemperature(event.target.value);
  };
  const handleChangeDensity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDensity(event.target.value);
  };
  const handleChangeCurrent_volume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrent_volume(event.target.value);
  };
  const handleChangeCurrent_mass = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrent_mass(event.target.value);
  };
  const handleChangeTotal_volume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTotal_volume(event.target.value);
  };
  const handleChangeTotal_mass = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTotal_mass(event.target.value);
  };
  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  return (
    <div>
      <Dialog
        open={openAddDialog}
        onClose={() => {
          setDate("");
          setTime("");
          setTemperature("");
          setDensity("");
          setCurrent_volume("");
          setCurrent_mass("");
          setTotal_volume("");
          setTotal_mass("");
          setNote("");
          handleAddDialogClose();
        }}
        PaperComponent={PaperComponent}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Режим работы насосных станций
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
            id="temperature"
            value={temperature}
            onChange={handleChangeTemperature}
            label="Температура"
            style={{ padding: 8 }}
            margin="dense"
            helperText={fuel_helperText}
            error={fuel_error}
          />
          <TextField
            id="density"
            value={density}
            onChange={handleChangeDensity}
            onClick={() => {
              // setFuel_shrink(true);
            }}
            multiline
            label="Плотность"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={fuel_helperText}
            error={fuel_error}
          />
          <TextField
            id="current_volume"
            value={current_volume}
            onChange={handleChangeCurrent_volume}
            onClick={() => {
              // setFuel_shrink(true);
            }}
            multiline
            label="Текущий объемный расход"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={fuel_helperText}
            error={fuel_error}
          />
          <TextField
            id="current_mass"
            value={current_mass}
            onChange={handleChangeCurrent_mass}
            multiline
            label="Текущий массовый расход"
            required
            helperText={fuel_helperText}
            error={fuel_error}
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="total_volume"
            value={total_volume}
            onChange={handleChangeTotal_volume}
            multiline
            label="Сумматор объема"
            required
            helperText={fuel_helperText}
            error={fuel_error}
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="total_mass"
            value={total_mass}
            onChange={handleChangeTotal_mass}
            multiline
            label="Сумматор массы"
            required
            helperText={fuel_helperText}
            error={fuel_error}
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
          <Button onClick={handleAddDialogClose} color="primary">
            Отменить
          </Button>
          <Button
            onClick={(ev) => {
              if (
                density === "" ||
                current_volume === "" ||
                current_mass === ""
              ) {
                setFuel_shrink(true);
                setFuel_error(true);
                setFuel_helperText("поле обязательно для заполнения");
                return;
              } else {
                setFuel_error(false);
              }
              handleCreate(
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
              );
              setDate("");
              setTime("");
              setTemperature("");
              setDensity("");
              setCurrent_volume("");
              setCurrent_mass("");
              setTotal_volume("");
              setTotal_mass("");
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
