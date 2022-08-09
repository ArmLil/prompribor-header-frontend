import React from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import NativeSelect from "@mui/material/NativeSelect";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import dataService from "../../../../../services/data.service";
import { validateLatLon } from "../../../../../helpers/validateLatLon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        width: "55ch",
        backgroundColor: "#fdf9f7",
        minWidth: "none",
      },
    },

    labelInput: {
      display: "flex",
      alignItems: "flex-end",
      marginTop: "30px",
      marginRight: "58px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.87)",
      backgroundColor: "#fdf9f7",
    },
    img: {
      width: "100px",
      objectFit: "contain",
      margin: "10px",
    },
    buttonText: {
      width: "500px",
      margin: "7px",
      marginLeft: "20px",
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

export default function FormDialog({ openAddDialog, handleAddDialogClose }) {
  const classes = useStyles();
  const [images, setImages] = React.useState([]);

  const [image, setImage] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [descPosition, setDescPosition] = React.useState("none");
  const [lat, setLat] = React.useState("");
  const [lon, setLon] = React.useState("");
  const [width, setWidth] = React.useState("100");
  const [length, setLength] = React.useState("");
  const [rotate, setRotate] = React.useState(0);

  const [image_error, setImage_error] = React.useState(false);
  const [description_error, setDescription_error] = React.useState(false);
  const [lat_error, setLat_error] = React.useState(false);
  const [lon_error, setLon_error] = React.useState(false);
  const [width_error, setWidth_error] = React.useState(false);
  const [length_error, setLength_error] = React.useState(false);
  const [rotate_error, setRotate_error] = React.useState(false);

  const [description_helperText, setDescription_helperText] = React.useState(
    ""
  );
  const [lat_helperText, setLat_helperText] = React.useState("");
  const [lon_helperText, setLon_helperText] = React.useState("");
  const [width_helperText, setWidth_helperText] = React.useState("");
  const [length_helperText, setLength_helperText] = React.useState("");
  const [rotate_helperText, setRotate_helperText] = React.useState("");

  React.useEffect(() => {
    const getImages = () => {
      dataService
        .getData("images")
        .then((response) => {
          setImages(response.data || []);
        })
        .catch(console.error);
    };
    getImages();
  }, []);

  function OptionImg({ img }) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <img
          src={`${img.imgUrl}`}
          style={{
            width: "40px",
            marginBottom: "3px",
            marginRight: "15px",
          }}
          alt={img.name}
        />
        <p style={{ margin: 0 }}> {img.name} </p>
        <p style={{ margin: 0, marginLeft: "5px" }}> {img.ext} </p>
      </div>
    );
  }

  const imgOptions = images.map((img) => {
    return {
      value: img,
      // label: `${img.name} ${img.ext}`,
      label: <OptionImg img={img} />,
    };
  });

  function MyFormHelperText() {
    const helperText = React.useMemo(() => {
      // if (focused) {
      //   return "This field is being focused";
      // }
      // Выберите изоброжение
      if (images.length === 0)
        return "Для выбора изображения для начала создайте из в разделе <<Изображения>>";
      return "Выберите изоброжение";
    }, []);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

  const handleChangeImage = (selectedOption) => {
    setImage(selectedOption.value);
    setImage_error(false);
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
    setDescription_error(false);
  };
  const handleChangeDescPosition = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescPosition(event.target.value);
  };
  const handleChangeLon = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLon(event.target.value);
    setLon_error(false);
  };
  const handleChangeLat = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLat(event.target.value);
    setLat_error(false);
  };
  const handleChangeWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWidth(event.target.value);
    setWidth_error(false);
  };
  const handleChangeLength = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(event.target.value);
    setLength_error(false);
  };
  const handleChangeRotate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRotate(event.target.value);
    setRotate_error(false);
  };

  const handleOnClose = (type) => {
    setImage("");
    setDescription("");
    setDescPosition("none");
    setLon("");
    setLat("");
    setWidth(100);
    setLength("");
    setRotate(0);

    setImage_error(false);
    setDescription_error(false);
    setLon_error(false);
    setLat_error(false);
    setWidth_error(false);
    setLength_error(false);
    setRotate_error(false);

    setDescription_helperText("");
    setLon_helperText("");
    setLat_helperText("");
    setWidth_helperText("");
    setLength_helperText("");
    setRotate_helperText("");

    handleAddDialogClose(type);
  };

  const handleSubmit = () => {
    let close = true;

    if (image === "") {
      setImage_error(true);
      close = false;
    }
    if (description.length > 50) {
      setDescription_error(true);
      setDescription_helperText("Описание слишком длинное");
      close = false;
    }
    if (description.length === 0) {
      setDescPosition("none");
    }
    if (lon === "") {
      setLon_error(true);
      setLon_helperText("поле обязательно для заполнения");
      close = false;
    } else if (!validateLatLon(lon)) {
      setLon_error(true);
      setLon_helperText("неправильный формат долготы (пример 56.18937)");
      close = false;
    }
    if (lat === "") {
      setLat_error(true);
      setLat_helperText("поле обязательно для заполнения");
      close = false;
    } else if (!validateLatLon(lat)) {
      setLat_error(true);
      setLat_helperText("неправильный формат широты (пример 42.88517)");
      close = false;
    }
    if (!Number.isInteger(+width)) {
      setWidth_error(true);
      setWidth_helperText("значение не является числом");
      close = false;
    }
    if (!Number.isInteger(+length)) {
      setLength_error(true);
      setLength_helperText("значение не является числом");
      close = false;
    }
    if (!Number.isInteger(+rotate)) {
      setRotate_error(true);
      setRotate_helperText("значение не является числом");
      close = false;
    } else if (rotate > 180 || rotate < -180) {
      setRotate_error(true);
      setRotate_helperText("допустимое значение от -180 до 180");
      close = false;
    }

    if (close) {
      dataService
        .postData("mapImages", {
          imageId: image.id,
          description,
          descPosition,
          lon,
          lat,
          width,
          length,
          rotate,
        })
        .then(() => {
          handleOnClose("submit");
        })
        .catch((err) => {});
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
          Изоброжения на карте
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для создания нового элемента, пожалуйста, заполните поля.
          </DialogContentText>

          <FormControl
            variant="standard"
            sx={{
              m: 1,
              width: "55ch",
              backgroundColor: "#fdf9f7",
              marginLeft: 0,
            }}
            error={image_error}
          >
            <Select
              options={imgOptions}
              onChange={handleChangeImage}
              placeholder="Изоброжение"
            />
            <MyFormHelperText />
          </FormControl>

          <TextField
            id="description"
            value={description}
            onChange={handleChangeDescription}
            label="Описание"
            style={{ padding: 8, marginBottom: 10 }}
            margin="dense"
            multiline
            error={description_error}
            helperText={description_helperText}
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
              style={{ width: "53.5ch", marginLeft: 8 }}
              value={descPosition}
              inputProps={{
                name: "descPosition",
                id: "uncontrolled-native",
              }}
              onChange={handleChangeDescPosition}
            >
              <option value="none">не отобразить</option>
              <option value="top">верх</option>
              <option value="bottom">вниз</option>
              <option value="right">право</option>
              <option value="left">лево</option>
              <option value="top-right">верх-право</option>
              <option value="top-left">верх-лево</option>
              <option value="bottom-right">вниз-право</option>
              <option value="bottom-left">вниз-лево</option>
            </NativeSelect>
            <FormHelperText>Позиция описании на карте</FormHelperText>
          </FormControl>
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
          <TextField
            id="width"
            value={width}
            onChange={handleChangeWidth}
            label="Ширина(px)"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={width_helperText}
            error={width_error}
          />
          <TextField
            id="length"
            value={length}
            onChange={handleChangeLength}
            label="Длина(px)"
            helperText={length_helperText}
            error={length_error}
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="rotate"
            value={rotate}
            onChange={handleChangeRotate}
            multiline
            label="Повернуть/градус угла [-180;+180])"
            helperText={rotate_helperText}
            error={rotate_error}
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
