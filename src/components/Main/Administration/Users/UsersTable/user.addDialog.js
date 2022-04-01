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
  })
);

function validateEmail(_email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(_email).toLowerCase());
}

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
  user,
}) {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [secondName, setSecondName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fatherName, setFatherName] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);

  const [name_error, setName_error] = React.useState(false);
  const [secondName_error, setSecondName_error] = React.useState(false);
  const [username_error, setUsername_error] = React.useState(false);
  const [position_error, setPosition_error] = React.useState(false);
  const [password_error, setPassword_error] = React.useState(false);
  const [email_error, setEmail_error] = React.useState(false);

  const [name_helperText, setName_helperText] = React.useState("");
  const [secondName_helperText, setSecondName_helperText] = React.useState("");
  const [username_helperText, setUsername_helperText] = React.useState("");
  const [position_helperText, setPosition_helperText] = React.useState("");
  const [password_helperText, setPassword_helperText] = React.useState("");
  const [email_helperText, setEmail_helperText] = React.useState("");

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setName_error(false);
  };
  const handleChangeSecondName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondName(event.target.value);
    setSecondName_error(false);
  };
  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsername_error(false);
  };
  const handleChangePosition = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(event.target.value);
    setPosition_error(false);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handleChangeFatherName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFatherName(event.target.value);
  };
  const handleChangeIsAdmin = (event) => {
    setIsAdmin(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPassword_error(false);
  };
  const handleOnClose = () => {
    setName("");
    setSecondName("");
    setUsername("");
    setPosition("");
    setEmail("");
    setPhone("");
    setPassword("");
    setFatherName("");
    setIsAdmin(false);

    setName_error(false);
    setSecondName_error(false);
    setUsername_error(false);
    setPosition_error(false);
    setPassword_error(false);
    setEmail_error(false);

    setName_helperText("");
    setSecondName_helperText("");
    setUsername_helperText("");
    setPosition_helperText("");
    setPassword_helperText("");
    setEmail_helperText("");

    handleAddDialogClose();
  };

  const handleSubmit = () => {
    let close = true;
    if (email !== "") {
      if (!validateEmail(email)) {
        setEmail_error(true);
        setEmail_helperText("е-майл не валидный");
        close = false;
      } else {
        setEmail_error(false);
        setEmail_helperText("");
      }
    }
    if (secondName === "") {
      setSecondName_error(true);
      setSecondName_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (username === "") {
      setUsername_error(true);
      setUsername_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (position === "") {
      setPosition_error(true);
      setPosition_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (name === "") {
      setName_error(true);
      setName_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (password === "") {
      setPassword_error(true);
      setPassword_helperText("поле обязательно для заполнения");
      close = false;
    }
    if (password !== "" && password.length < 8) {
      setPassword_error(true);
      setPassword_helperText("пароль должен содержать не менее 8 символов ");
      close = false;
    }
    if (close) {
      dataService
        .postData("users", {
          name,
          secondName,
          fatherName,
          username,
          position,
          isAdmin,
          email,
          phone,
          password,
          token: user.token,
        })
        .then((result) => {
          if (result.data.user[0]) {
            const newUser = result.data.user[0];
            handleCreate(newUser);
            if (close) {
              handleOnClose();
            }
          }
        })
        .catch((err) => {
          console.log({ err });
          if (err.response && err.response.data) {
            if (err.response.data.message === "username already in use") {
              setUsername_error(true);
              setUsername_helperText("имя пользователя уже используется");
            } else {
              alert(err.response.data.message);
            }
          }
          close = false;
          if (close) {
            handleOnClose();
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
          Пользователь
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для создания нового элемента, пожалуйста, заполните поля.
          </DialogContentText>
          <TextField
            id="name"
            value={name}
            onChange={handleChangeName}
            label="Имя"
            style={{ padding: 8 }}
            margin="dense"
            helperText={name_helperText}
            error={name_error}
            required
          />
          <TextField
            id="secondName"
            value={secondName}
            onChange={handleChangeSecondName}
            label="Ф амилия"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={secondName_helperText}
            error={secondName_error}
          />
          <TextField
            id="fatherName"
            value={fatherName}
            onChange={handleChangeFatherName}
            label="Отчество"
            helperText=""
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="username"
            value={username}
            onChange={handleChangeUsername}
            multiline
            label="Никнейм"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={username_helperText}
            error={username_error}
          />
          <TextField
            id="position"
            value={position}
            onChange={handleChangePosition}
            multiline
            label="Должность"
            required
            helperText={position_helperText}
            error={position_error}
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
              value={isAdmin}
              inputProps={{
                name: "isAdmin",
                id: "uncontrolled-native",
              }}
              onChange={handleChangeIsAdmin}
              style={{ width: "53.5ch", marginLeft: 8 }}
            >
              <option value={true}>Да</option>
              <option value={false}>Нет</option>
            </NativeSelect>
            <FormHelperText>Имеет права админа</FormHelperText>
          </FormControl>
          <TextField
            id="email"
            value={email}
            onChange={handleChangeEmail}
            helperText={email_helperText}
            error={email_error}
            label="Почта"
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="phone"
            value={phone}
            onChange={handleChangePhone}
            multiline
            label="Телефон"
            style={{ padding: 8 }}
            margin="dense"
          />
          <TextField
            id="password"
            value={password}
            onChange={handleChangePassword}
            multiline
            label="Пароль"
            required
            helperText={password_helperText}
            error={password_error}
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
