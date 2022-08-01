import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useDispatch } from "react-redux";
import Draggable from "react-draggable";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import dataService from "../../../../../services/data.service";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        width: "55ch",
        backgroundColor: "#fdf9f7",
      },
    },
    img: {
      width: "100px",
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
  const [imgFile, setImgFile] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [name, setName] = React.useState("");

  const [img_error, setImg_error] = React.useState(false);
  const [name_error, setName_error] = React.useState(false);

  const [name_helperText, setName_helperText] = React.useState("");
  const [img_helperText, setImg_helperText] = React.useState("");

  const dispatch = useDispatch();

  const handleChangeImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.result);
    if (event.target.files && event.target.files[0]) {
      setImgFile(event.target.files[0]);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
      setImg_error(false);
    }
  };
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", imgFile, imgFile.name);

    // Details of the uploaded file
    console.log(imgFile);

    // Request made to the backend api
    // Send formData object
    dataService.postData("images", formData);
  };

  const fileData = () => {
    if (imgFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {imgFile.name}</p>
          <p>File Type: {imgFile.type}</p>
          <p>Last Modified: {imgFile.lastModifiedDate.toDateString()}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  const handleOnClose = () => {
    setName("");
    setImgUrl("");
    setImgFile("");

    setName_error(false);
    setImg_error(false);

    setName_helperText("");
    setImg_helperText("");
    handleAddDialogClose();
  };

  const handleSubmit = () => {
    let close = true;

    if (name === "") {
      setName_error(true);
      setName_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (imgFile === "") {
      setImg_error(true);
      setImg_helperText("необходимо выбрать изоброжение");
      close = false;
    }

    if (close) {
      dataService
        .postData(`images?token=${user.token}`, {
          name,
          imgUrl,
          token: user.token,
        })
        .then(() => {
          handleOnClose();
          // dispatch(getMapCommCenters("mapCommCenters")).catch((err) =>
          //   console.log(err)
          // );
        })
        .catch((err) => {
          let error = err;
          console.log(err.response);
          if (err.response && err.response.data.message) {
            error = err.response.data.message;
            alert(error);
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
          Изоброжение
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для создания нового элемента, пожалуйста, заполните поля.
          </DialogContentText>

          <TextField
            id="name"
            value={name}
            onChange={handleChangeName}
            label="Наименование"
            required
            helperText={name_helperText}
            style={{ padding: 8 }}
            margin="dense"
            error={name_error}
          />
          <FormControl className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">
              With a start adornment
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              type="file"
              onChange={handleChangeImgFile}
              startAdornment={
                <InputAdornment position="start">
                  <img className={classes.img} src={imgUrl} />
                </InputAdornment>
              }
            />
          </FormControl>
          <button onClick={onFileUpload}>Upload!</button>
          {fileData()}
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
