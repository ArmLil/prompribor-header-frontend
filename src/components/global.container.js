import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Login from "./login.component";
import Register from "./register.component";
import Home from "./home.component";
import Main from "./Main/main.router.index";
import Profile from "./profile.component";

// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import { history } from "../helpers/history";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class GlobalContainer extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      // showModeratorBoard: false,
      // showAdminBoard: false,
      // bodyPhone: "bodyPhone",
    };

    history.listen((location) => {
      if (this.props.message) props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const { user, bodyPhone, show, text, status } = this.props;
    const PrivateRoute = ({
      comp: Component, // use comp prop
      ...rest
    }) => (
      <Route
        {...rest}
        render={(props) =>
          !user ? <Redirect to="/login" /> : <Component {...props} />
        }
      />
    );
    return (
      <Router history={history}>
        <div className={bodyPhone}>
          <nav
            className="navbar navbar-expand navbar-dark  sticky-top"
            style={{ backgroundColor: "#040406", opacity: "", top: 0 }}
          >
            <Link to={"/"} className="navbar-brand" style={{ display: "flex" }}>
              <h5
                style={{
                  marginBottom: 0,
                  marginLeft: 20,
                }}
              >
                СМТ <em style={{ fontSize: 15 }}>тпр-1</em>
              </h5>
            </Link>
            <div className="navbar-nav mr-auto">
              {user && (
                <li className="nav-item">
                  <Link to={"/main"} className="nav-link">
                    Главный
                  </Link>
                </li>
              )}
            </div>

            {user ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {user.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    Выйти
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Войти
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />

            <PrivateRoute path="/main" component={Main} />
          </Switch>
          <Snackbar open={show} autoHideDuration={5000}>
            <Alert severity={status} sx={{ width: "100%" }}>
              {text}
            </Alert>
          </Snackbar>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user, bodyPhone } = state.authReducer;
  const { show, text, status } = state.alertReducer;
  return {
    user,
    bodyPhone,
    show,
    text,
    status,
  };
}

export default connect(mapStateToProps)(GlobalContainer);
