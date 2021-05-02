import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }
    // <p>
    //   <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
    //   {currentUser.token.substr(currentUser.token.length - 20)}
    // </p>

    return (
      <div className="bodyPhone pt-3" style={{ height: "91vh" }}>
        <div className="container ">
          <header className="jumbotron container">
            <h4 className="mb-4">
              <strong>Профиль</strong>
            </h4>
            <h5 className="mb-5">
              <strong>Никнейм: {currentUser.username}</strong>
            </h5>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
              <strong>е-майл:</strong> {currentUser.email}
            </p>
            <strong>
              {currentUser.roleAdmin ? "роль: админ" : "роль: гость"}
            </strong>
          </header>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Profile);
