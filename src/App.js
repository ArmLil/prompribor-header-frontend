import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Main from "./components/main.component";
import Profile from "./components/profile.component";
// import BoardUser from "./components/board-user.component";
// import BoardModerator from "./components/board-moderator.component";
// import BoardAdmin from "./components/board-admin.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      bodyPhone: "bodyPhone",
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: !user.roleAdmin,
        showAdminBoard: user.roleAdmin,
        bodyPhone: "",
      });
    }
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
  // {currentUser && (
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
      currentUser,
      // showModeratorBoard,
      // showAdminBoard,
      bodyPhone,
    } = this.state;
    return (
      <Router history={history}>
        <div className={bodyPhone}>
          <nav
            className="navbar navbar-expand navbar-dark  sticky-top"
            style={{ backgroundColor: "#040406", opacity: "0.88", top: 0 }}
          >
            <Link to={"/"} className="navbar-brand">
              СисМон-Нефтепровод
            </Link>
            <div className="navbar-nav mr-auto">
              {currentUser && (
                <li className="nav-item">
                  <Link to={"/main"} className="nav-link">
                    Главный
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
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

          <div>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/main" component={Main} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
