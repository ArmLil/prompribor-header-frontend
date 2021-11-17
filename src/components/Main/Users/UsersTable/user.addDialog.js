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
  const [current_mass, setCurrent_mass] = React.useState("");
  const [total_volume, setTotal_volume] = React.useState("");
  const [total_mass, setTotal_mass] = React.useState("");
  const [note, setNote] = React.useState("");

  const [temperature_error, setTemperature_error] = React.useState(false);
  const [density_error, setDensity_error] = React.useState(false);
  const [current_volume_error, setCurrent_volume_error] = React.useState(false);
  const [current_mass_error, setCurrent_mass_error] = React.useState(false);
  const [total_volume_error, setTotal_volume_error] = React.useState(false);
  const [total_mass_error, setTotal_mass_error] = React.useState(false);

  const [temperature_helperText, setTemperature_helperText] = React.useState(
    ""
  );
  const [density_helperText, setDensity_helperText] = React.useState("");
  const [
    current_volume_helperText,
    setCurrent_volume_helperText,
  ] = React.useState("");
  const [current_mass_helperText, setCurrent_mass_helperText] = React.useState(
    ""
  );
  const [total_volume_helperText, setTotal_volume_helperText] = React.useState(
    ""
  );
  const [total_mass_helperText, setTotal_mass_helperText] = React.useState("");

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
    setTemperature_error(false);
  };
  const handleChangeDensity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDensity(event.target.value);
    setDensity_error(false);
  };
  const handleChangeCurrent_volume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrent_volume(event.target.value);
    setCurrent_volume_error(false);
  };
  const handleChangeCurrent_mass = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrent_mass(event.target.value);
    setCurrent_mass_error(false);
  };
  const handleChangeTotal_volume = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTotal_volume(event.target.value);
    setTotal_volume_error(false);
  };
  const handleChangeTotal_mass = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTotal_mass(event.target.value);
    setTotal_mass_error(false);
  };
  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };
  const handleOnClose = () => {
    setDate("");
    setTime("");
    setTemperature("");
    setDensity("");
    setCurrent_volume("");
    setCurrent_mass("");
    setTotal_volume("");
    setTotal_mass("");
    setNote("");

    setTemperature_error(false);
    setDensity_error(false);
    setCurrent_volume_error(false);
    setCurrent_mass_error(false);
    setTotal_volume_error(false);
    setTotal_mass_error(false);

    setTemperature_helperText(false);
    setDensity_helperText(false);
    setCurrent_volume_helperText(false);
    setCurrent_mass_helperText(false);
    setTotal_volume_helperText(false);
    setTotal_mass_helperText(false);

    handleAddDialogClose();
  };
  return (
    <div>
      <Dialog
        open={openAddDialog}
        onClose={() => {
          handleOnClose();
        }}
        PaperComponent={PaperComponent}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Параметры процесса транспортирования горючего
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
            helperText={temperature_helperText}
            error={temperature_error}
            required
          />
          <TextField
            id="density"
            value={density}
            onChange={handleChangeDensity}
            multiline
            label="Плотность"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={density_helperText}
            error={density_error}
          />
          <TextField
            id="current_volume"
            value={current_volume}
            onChange={handleChangeCurrent_volume}
            multiline
            label="Текущий объемный расход"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={current_volume_helperText}
            error={current_volume_error}
          />
          <TextField
            id="current_mass"
            value={current_mass}
            onChange={handleChangeCurrent_mass}
            multiline
            label="Текущий массовый расход"
            required
            helperText={current_mass_helperText}
            error={current_mass_error}
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
            helperText={total_volume_helperText}
            error={total_volume_error}
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
            helperText={total_mass_helperText}
            error={total_mass_error}
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="note"
            value={note}
            onChange={handleChangeNote}
            multiline
            label="Примечание"
            helperText=""
            style={{ padding: 8 }}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleOnClose();
            }}
            color="primary"
          >
            Отменить
          </Button>
          <Button
            onClick={(ev) => {
              let close = true;
              if (density === "") {
                setDensity_error(true);
                setDensity_helperText("поле обязательно для заполнения");
                close = false;
              }
              if (current_volume === "") {
                setCurrent_volume_error(true);
                setCurrent_volume_helperText("поле обязательно для заполнения");
                close = false;
              }
              if (current_mass === "") {
                setCurrent_mass_error(true);
                setCurrent_mass_helperText("поле обязательно для заполнения");
                close = false;
              }
              if (temperature === "") {
                setTemperature_error(true);
                setTemperature_helperText("поле обязательно для заполнения");
                close = false;
              }
              if (total_volume === "") {
                setTotal_volume_error(true);
                setTotal_volume_helperText("поле обязательно для заполнения");
                close = false;
              }
              if (total_mass === "") {
                setTotal_mass_error(true);
                setTotal_mass_helperText("поле обязательно для заполнения");
                close = false;
              }
              if (close) {
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
                handleOnClose();
              }
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
