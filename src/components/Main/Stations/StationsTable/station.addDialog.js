import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getMapCommCenters } from "../../../../actions/mapCommCenters";
import { validateLatLon } from "../../../../helpers/validateLatLon";
import { validatePath } from "../../../../helpers/validatePath";
import dataService from "../../../../services/data.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        width: "55ch",
        backgroundColor: "#fdf9f7",
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
  openAddDialog,
  user,
  handleAddDialogClose,
}) {
  const classes = useStyles();
  const [path, setPath] = React.useState("");
  const [name, setName] = React.useState("");
  const [lat, setLat] = React.useState("");
  const [lon, setLon] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [index, setIndex] = React.useState("");
  const [tablePosition, setTablePosition] = React.useState("top");

  const [path_error, setPath_error] = React.useState(false);
  const [name_error, setName_error] = React.useState(false);
  const [lat_error, setLat_error] = React.useState(false);
  const [lon_error, setLon_error] = React.useState(false);
  const [index_error, setIndex_error] = React.useState(false);
  const [tablePosition_error, setTablePosition_error] = React.useState(false);

  const [path_helperText, setPath_helperText] = React.useState("");
  const [name_helperText, setName_helperText] = React.useState("");
  const [lat_helperText, setLat_helperText] = React.useState("");
  const [lon_helperText, setLon_helperText] = React.useState("");
  const [index_helperText, setIndex_helperText] = React.useState("");
  const [
    tablePosition_helperText,
    setTablePosition_helperText,
  ] = React.useState("");

  const dispatch = useDispatch();

  const handleChangePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
    setPath_error(false);
  };
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setName_error(false);
  };
  const handleChangeLat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLat(event.target.value);
    setLat_error(false);
  };
  const handleChangeLon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLon(event.target.value);
    setLon_error(false);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleChangeIndex = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(event.target.value);
    setIndex_error(false);
  };
  const handleChangeTablePosition = (event) => {
    setTablePosition(event.target.value);
    setTablePosition_error(false);
  };

  const handleOnClose = () => {
    setPath("");
    setName("");
    setIndex("");
    setLat("");
    setLon("");
    setDescription("");

    setPath_error(false);
    setName_error(false);
    setLat_error(false);
    setLon_error(false);
    setIndex_error(false);
    setTablePosition_error(false);

    setPath_helperText("");
    setName_helperText("");
    setLat_helperText("");
    setLon_helperText("");
    setIndex_helperText("");
    setTablePosition_helperText("");
    handleAddDialogClose();
  };

  const handleSubmit = () => {
    let close = true;
    if (path === "") {
      setPath_error(true);
      setPath_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (!validatePath(path)) {
      setPath_error(true);
      setPath_helperText(
        "может включать не менее трёх символов, латиницы, цифры и дефис,(пример NS-10)"
      );
      close = false;
    }

    if (name === "") {
      setName_error(true);
      setName_helperText("поле обязательно для заполнения");
      close = false;
    } else if (name.length < 3) {
      setName_error(true);
      setName_helperText("должно содержать не менее трёх символов");
      close = false;
    }

    if (lat === "") {
      setLat_error(true);
      setLat_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (!validateLatLon(lat)) {
      setLat_error(true);
      setLat_helperText("неправильный формат широты (пример 42.88517)");
      close = false;
    }
    if (!validateLatLon(lon)) {
      setLon_error(true);
      setLon_helperText("неправильный формат долготы (пример 56.18937)");
      close = false;
    }
    if (lon === "") {
      setLon_error(true);
      setLon_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (index === "") {
      setIndex_error(true);
      setIndex_helperText("поле обязательно для заполнения");
      close = false;
    } else if (!Number(index) || index.slice(-2) !== "00") {
      setIndex_error(true);
      setIndex_helperText(
        "Поле должно содержать только число, которое заканчивается на 00"
      );
      close = false;
    }

    if (close) {
      dataService
        .postData(`commCenters?token=${user.token}`, {
          path,
          name,
          index,
          lat,
          lon,
          tablePosition,
          description,
          token: user.token,
        })
        .then(() => {
          handleOnClose();
          dispatch(getMapCommCenters("mapCommCenters")).catch((err) =>
            console.log(err)
          );
        })
        .catch((err) => {
          let error = err;
          console.log(err.response);
          if (err.response && err.response.data.message) {
            error = err.response.data.message;
            alert(error);
          } else if (err.response && err.response.data.pathError) {
            setPath_error(true);
            setPath_helperText(err.response.data.pathError);
          } else if (err.response && err.response.data.nameError) {
            setName_error(true);
            setName_helperText(err.response.data.nameError);
          } else if (err.response && err.response.data.indexError) {
            setIndex_error(true);
            setIndex_helperText(err.response.data.indexError);
          } else {
            alert(error);
          }
        });
    }
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
          Насосная станция
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для создания нового элемента, пожалуйста, заполните поля.
          </DialogContentText>
          <TextField
            id="path"
            value={path}
            onChange={handleChangePath}
            label="Идентификатор"
            style={{ padding: 8 }}
            margin="dense"
            helperText={path_helperText}
            error={path_error}
            required
          />
          <TextField
            id="name"
            value={name}
            onChange={handleChangeName}
            label="Наименование"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={name_helperText}
            error={name_error}
          />
          <TextField
            id="index"
            value={index}
            onChange={handleChangeIndex}
            label="Индекс / очередь на карте"
            required
            helperText={index_helperText}
            style={{ padding: 8 }}
            margin="dense"
            error={index_error}
          />
          <TextField
            id="lat"
            value={lat}
            onChange={handleChangeLat}
            multiline
            label="Широта"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={lat_helperText}
            error={lat_error}
          />
          <TextField
            id="lon"
            value={lon}
            onChange={handleChangeLon}
            multiline
            label="Долгота"
            required
            helperText={lon_helperText}
            error={lon_error}
            style={{ padding: 8 }}
            margin="dense"
          />
          <FormControl
            variant="standard"
            sx={{
              m: 1,
              minWidth: "55ch",
              backgroundColor: "#fdf9f7",
              marginLeft: 0,
            }}
          >
            <NativeSelect
              value={tablePosition}
              inputProps={{
                name: "tablePosition",
                id: "uncontrolled-native",
              }}
              onChange={handleChangeTablePosition}
              style={{ width: "53.5ch", marginLeft: 8 }}
            >
              <option value="top">верх</option>
              <option value="bottom">вниз</option>
              <option value="right">право</option>
              <option value="left">лево</option>
              <option value="top-right">верх-право</option>
              <option value="top-left">верх-лево</option>
              <option value="bottom-right">вниз-право</option>
              <option value="bottom-left">вниз-лево</option>
            </NativeSelect>
            <FormHelperText>Позиция таблицы на карте</FormHelperText>
          </FormControl>
          <TextField
            id="description"
            value={description}
            onChange={handleChangeDescription}
            label="Описание"
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
          <Button onClick={(ev) => handleSubmit()} color="primary">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
