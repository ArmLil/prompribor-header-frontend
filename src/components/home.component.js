import React, { Component } from "react";
import { connect } from "react-redux";

import UserService from "../services/user.service";
import { LoremIpsum, Avatar } from "react-lorem-ipsum";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      currentUser: undefined,
      rootStyle: "pt-3",
    };
  }

  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        rootStyle: "bodyPhone pt-3",
      });
    }
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    const { rootStyle } = this.state;
    return (
      <div className={rootStyle} style={{ height: "91vh" }}>
        <div className="container" style={{ opacity: "0.9" }}>
          <header
            className="jumbotron"
            style={{ opacity: "0.88", overflowY: "scroll", height: "80vh" }}
          >
            <h3>{this.state.content}</h3>
            <LoremIpsum p={2} />
          </header>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Home);
