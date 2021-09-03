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
  const [temperature, setTemperature] = React.useState(
    params.temperature || ""
  );
  const [density, setDensity] = React.useState(params.density || "");
  const [current_volume, setCurrent_volume] = React.useState(
    params.current_volume || ""
  );
  const [current_mass, setCurrent_mass] = React.useState(
    params.current_mass || ""
  );
  const [total_volume, setTotal_volume] = React.useState(
    params.total_volume || ""
  );
  const [total_mass, setTotal_mass] = React.useState(params.total_mass || "");
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

        if (params.temperature) setTemperature(params.temperature);
        else setTemperature("");

        if (params.density) setDensity(params.density);
        else setDensity("");

        if (params.current_volume) setCurrent_volume(params.current_volume);
        else setCurrent_volume("");

        if (params.current_mass) setCurrent_mass(params.current_mass);
        else setCurrent_mass("");

        if (params.total_volume) setTotal_volume(params.total_volume);
        else setTotal_volume("");

        if (params.total_mass) setTotal_mass(params.total_mass);
        else setTotal_mass("");

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
            id="temperature"
            value={temperature}
            onChange={handleChangeTemperature}
            label="Температура"
            style={{ padding: 8 }}
            margin="dense"
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
          />
          <TextField
            id="current_mass"
            value={current_mass}
            onChange={handleChangeCurrent_mass}
            multiline
            label="Текущий массовый расход"
            helperText="не обязательно"
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="total_volume"
            value={total_volume}
            onChange={handleChangeTotal_volume}
            multiline
            label="Сумматор объема"
            helperText="не обязательно"
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="total_mass"
            value={total_mass}
            onChange={handleChangeTotal_mass}
            multiline
            label="Сумматор объема"
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
                temperature,
                density,
                current_volume,
                current_mass,
                total_volume,
                total_mass,
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
