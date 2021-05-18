import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link, Redirect } from "react-router-dom";

import Login from "./login.component";
import Register from "./register.component";
import Home from "./home.component";
import Main from "./Main/main.index";
import Profile from "./profile.component";
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";

import { history } from "../helpers/history";

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
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  logOut() {
    this.props.dispatch(logout());
  }

  // {showModeratorBoard && (
  //   <li className="nav-item">
  //     <Link to={"/mod"} className="nav-link">
  //       Moderator Board
  //     </Link>
  //   </li>
  // )}
  //
  // {showAdminBoard && (
  //   <li className="nav-item">
  //     <Link to={"/admin"} className="nav-link">
  //       Admin Board
  //     </Link>
  //   </li>
  // )}
  //
  // {user && (
  //   <li className="nav-item">
  //     <Link to={"/user"} className="nav-link">
  //       User
  //     </Link>
  //   </li>
  // )}

  // <Route path="/admin" component={BoardAdmin} />
  // <Route path="/user" component={BoardUser} />
  // <Route path="/mod" component={BoardModerator} />

  render() {
    const {
      // showModeratorBoard,
      // showAdminBoard,
    } = this.state;
    const { user, bodyPhone } = this.props;
    console.log({ user });
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
            <Link to={"/"} className="navbar-brand">
              СисМон-Нефтепровод
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

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Регистрация
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

            <PrivateRoute path="/main" comp={Main} />
          </Switch>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authReducer;
  return {
    user,
  };
}

export default connect(mapStateToProps)(GlobalContainer);
