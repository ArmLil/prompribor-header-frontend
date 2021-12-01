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

import dataService from "../../../../services/data.service";

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

function validateEmail(_email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(_email).toLowerCase());
}

export default function FormDialog({
  handleEditDialogClose,
  handleEdit,
  openEditDialog,
  userParams,
}) {
  const classes = useStyles();

  const [name, setName] = React.useState(userParams.name || "");
  const [secondName, setSecondName] = React.useState(
    userParams.secondName || ""
  );
  const [fatherName, setFatherName] = React.useState(
    userParams.fatherName || ""
  );
  const [username, setUsername] = React.useState(userParams.username || "");
  const [position, setPosition] = React.useState(userParams.position || "");
  const [email, setEmail] = React.useState(userParams.email || "");
  const [phone, setPhone] = React.useState(userParams.phine || "");
  const [isAdmin, setIsAdmin] = React.useState(userParams.isAdmin || false);
  const [password, setPassword] = React.useState("");

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
  const [password_helperText, setPassword_helperText] = React.useState(
    "заполните поле если хотите изменить пароль"
  );
  const [email_helperText, setEmail_helperText] = React.useState("");

  React.useEffect(() => {
    const setParams = () => {
      console.log({ userParams });
      if (userParams.name) setName(userParams.name);
      if (userParams.username) setUsername(userParams.username);
      if (userParams.secondName) setSecondName(userParams.secondName);
      if (userParams.fatherName) setFatherName(userParams.fatherName);
      if (userParams.position) setPosition(userParams.position);
      if (userParams.email) setEmail(userParams.email);
      if (userParams.phone) setPhone(userParams.phone);
    };
    setParams();
  }, [userParams]);

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
    console.log(event.target.value);
    setIsAdmin(event.target.value);
  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (event.target.value === "") {
      setPassword_helperText("заполните поле если хотите изменить пароль");
    }
    setPassword_error(false);
  };

  const handleOnClose = () => {
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
    setPassword_helperText("заполните поле если хотите изменить пароль");
    setEmail_helperText("");

    handleEditDialogClose();
  };

  const handleSubmit = (id) => {
    console.log("handleSubmit");
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
      setSecondName_helperText("поле не может быть пустым");
      close = false;
    }
    if (username === "") {
      setUsername_error(true);
      setUsername_helperText("поле не может быть пустым");
      close = false;
    }
    if (position === "") {
      setPosition_error(true);
      setPosition_helperText("поле не может быть пустым");
      close = false;
    }
    if (name === "") {
      setName_error(true);
      setName_helperText("поле не может быть пустым");
      close = false;
    }
    if (password !== "" && password.length < 8) {
      setPassword_error(true);
      setPassword_helperText("пароль должен содержать не менее 8 символов ");
      close = false;
    }
    if (close) {
      dataService
        .putData(`users/${id}`, {
          name,
          secondName,
          fatherName,
          username,
          position,
          isAdmin,
          email,
          phone,
          password,
          token: userParams.token,
        })
        .then((result) => {
          console.log({ result });
          if (result.data.user) {
            const editedUser = result.data.user;
            handleEdit(editedUser);
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
        open={openEditDialog}
        onClose={handleEditDialogClose}
        PaperComponent={PaperComponent}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Пользователь
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Пожалуйста, редактируйте необходимые поля.
          </DialogContentText>
          <TextField
            id="name"
            value={name}
            onChange={handleChangeName}
            label="Имя"
            style={{ padding: 8 }}
            margin="dense"
            required
            helperText={name_helperText}
            error={name_error}
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
            label="Пароль"
            helperText={password_helperText}
            error={password_error}
            style={{ padding: 8 }}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Отменить
          </Button>
          <Button onClick={() => handleSubmit(userParams.id)} color="primary">
            Подтвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
