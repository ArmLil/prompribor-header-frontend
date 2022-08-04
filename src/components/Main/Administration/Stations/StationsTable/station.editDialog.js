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
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { getMapCommCenters } from "../../../../../actions/mapCommCenters";
import { validateLatLon } from "../../../../../helpers/validateLatLon";
import { validatePath } from "../../../../../helpers/validatePath";

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
  stationParams,
}) {
  const classes = useStyles();
  const [path, setPath] = React.useState("");
  const [name, setName] = React.useState("");
  const [lat, setLat] = React.useState("");
  const [lon, setLon] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [index, setIndex] = React.useState("");
  const [tablePosition, setTablePosition] = React.useState("top");
  const [initialStationParams, setInitialStationParams] = React.useState({});

  const [path_error, setPath_error] = React.useState(false);
  const [name_error, setName_error] = React.useState(false);
  const [lat_error, setLat_error] = React.useState(false);
  const [lon_error, setLon_error] = React.useState(false);
  const [index_error, setIndex_error] = React.useState(false);

  const [path_helperText, setPath_helperText] = React.useState("");
  const [name_helperText, setName_helperText] = React.useState("");
  const [lat_helperText, setLat_helperText] = React.useState("");
  const [lon_helperText, setLon_helperText] = React.useState("");

  const [index_helperText, setIndex_helperText] = React.useState("");

  const dispatch = useDispatch();

  React.useEffect(() => {
    const setParams = () => {
      if (stationParams.path) setPath(stationParams.path);
      if (stationParams.lon) setLon(stationParams.lon);
      if (stationParams.name) setName(stationParams.name);
      if (stationParams.lat) setLat(stationParams.lat);
      if (stationParams.tablePosition)
        setTablePosition(stationParams.tablePosition);
      if (stationParams.index) setIndex(stationParams.index);
      if (stationParams.description) setDescription(stationParams.description);
      setInitialStationParams(stationParams);
    };
    if (Object.keys(stationParams).length > 0) {
      setParams();
    }
  }, [stationParams]);

  const handleChangePath = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPath(event.target.value);
    setPath_error(false);
  };
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setName_error(false);
  };
  const handleChangeLon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLon(event.target.value);
    setLon_error(false);
  };
  const handleChangeLat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLat(event.target.value);
    setLat_error(false);
  };
  const handleChangeIndex = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndex(event.target.value);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleChangeTablePosition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTablePosition(event.target.value);
  };

  const handleOnClose = () => {
    setPath_error(false);
    setName_error(false);
    setLon_error(false);
    setLat_error(false);
    setIndex_error(false);

    setPath_helperText("");
    setName_helperText("");
    setLon_helperText("");
    setLat_helperText("");
    setIndex_helperText("");

    handleEditDialogClose();
  };

  const handleSubmit = (id) => {
    console.log("handleSubmit...");
    console.log({ path, name, index, lat, lon, tablePosition, description });
    let close = true;
    if (path === "") {
      setPath_error(true);
      setPath_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (!validatePath(path)) {
      setPath_error(true);
      setPath_helperText(
        "может включать не менее трёх символов, латиницы, цифры и дефис,(пример NS-10), желательно, чтобы число в идентификаторе совпало с первым числом индекса"
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
    console.log(!validateLatLon(lat));
    if (!validateLatLon(lat)) {
      setLat_error(true);
      setLat_helperText("неправильный формат широты (пример 42.88517)");
      close = false;
    }
    if (lon === "") {
      setLon_error(true);
      setLon_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (!validateLatLon(lon)) {
      setLon_error(true);
      setLon_helperText("неправильный формат долготы (пример 56.18937)");
      close = false;
    }

    if (index === "") {
      setIndex_error(true);
      setIndex_helperText("поле обязательно для заполнения");
      close = false;
    } else if (!Number(index) || String(index).slice(-2) !== "00") {
      setIndex_error(true);
      setIndex_helperText(
        "Поле должно содержать только натуральное число, которое заканчивается на 00"
      );
      close = false;
    }
    console.log({ index, lat, lon }, initialStationParams);
    if (
      index !== initialStationParams.index &&
      (lat !== initialStationParams.lat || lon !== initialStationParams.lon)
    ) {
      setIndex(initialStationParams.index);
      alert(
        "Возвращено начальное значение индекса, нельзя одновременно менять индекс и координаты."
      );
      close = false;
    }
    console.log({ close });
    if (close) {
      dataService
        .putData(`commCenters/${stationParams.id}`, {
          path,
          name,
          lat,
          lon,
          index,
          description,
          tablePosition,
          token: stationParams.token,
        })
        .then(() => {
          handleOnClose();
          dispatch(getMapCommCenters("mapCommCenters")).catch((err) =>
            console.log({ err })
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
        open={openEditDialog}
        onClose={handleOnClose}
        PaperComponent={PaperComponent}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Насосная станция
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пожалуйста, редактируйте необходимые поля.
          </DialogContentText>
          <TextField
            id="path"
            value={path}
            onChange={handleChangePath}
            label="Идентификатор"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={path_helperText}
            error={path_error}
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
            helperText={index_helperText}
            error={index_error}
            label="Индекс / очередь на карте"
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="lat"
            value={lat}
            onChange={handleChangeLat}
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
            label="Долгота"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={lon_helperText}
            error={lon_error}
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
            multiline
            label="Описание"
            style={{ padding: 8 }}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose} color="primary">
            Отменить
          </Button>
          <Button
            onClick={() => handleSubmit(stationParams.id)}
            color="primary"
          >
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
