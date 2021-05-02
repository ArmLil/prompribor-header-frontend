import React, { Component } from "react";

import UserService from "../services/user.service";
import { LoremIpsum, Avatar } from "react-lorem-ipsum";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="bodyPhone pt-3" style={{ height: "91vh" }}>
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
