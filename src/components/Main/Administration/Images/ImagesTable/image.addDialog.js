import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
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
  const [img_helperTextStyle, setImg_helperTextStyle] = React.useState("");

  const handleChangeImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleChangeImgFile", event.target);
    if (event.target.files && event.target.files[0]) {
      setImgFile(event.target.files[0]);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
      setImg_error(false);
    }
  };
  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOnClose = () => {
    setName("");
    setImgUrl("");
    setImgFile("");

    setName_error(false);
    setImg_error(false);

    setName_helperText("");
    setImg_helperTextStyle("");
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
      setImg_helperTextStyle("red");
      close = false;
    }
    if (close) {
      const formData = new FormData();

      // Update the formData object
      formData.append("myFile", imgFile, imgFile.name);

      // Details of the uploaded file
      console.log(imgFile);

      // Request made to the backend api
      // Send formData object
      dataService
        .postData(`upload-image?token=${user.token}`, formData)
        .then((response) => {
          console.log({ response });
          dataService
            .postData(`images?token=${user.token}`, {
              name,
              imgUrl: response.data.img.imgUrl,
              token: user.token,
            })
            .then(() => {
              handleOnClose();
              dataService.getData("images").then((response) => {
                console.log("get ", response);
              });
            })
            .catch((err) => {
              let error = err;
              console.log(err.response);
            });
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
            label="Краткое название"
            required
            helperText={name_helperText}
            style={{ padding: 8 }}
            margin="dense"
            error={name_error}
          />

          <div className={classes.labelInput}>
            <IconButton
              color="primary"
              aria-label="file-upload"
              component="label"
            >
              <Input
                id="file-upload"
                type="file"
                hidden
                accept="image/*"
                onChange={handleChangeImgFile}
              />
              <PhotoCamera />
            </IconButton>
            <p
              className={classes.buttonText}
              style={{ color: img_helperTextStyle }}
            >
              {" "}
              {imgFile.name || "Выберите файл..."}
            </p>
            <img className={classes.img} src={imgUrl} alt={""} />
          </div>
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
