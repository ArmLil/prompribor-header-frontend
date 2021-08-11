import React, { Component } from "react";
import { connect } from "react-redux";

import UserService from "../services/user.service";
// import { LoremIpsum } from "react-lorem-ipsum";

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
            <br></br>

            <h5>
              Автоматизированная система мониторинга сборно-разборного
              трубопровода
            </h5>
            <br></br>
            <p style={{ fontSize: "17px" }}>
              &nbsp; Автоматизированная система мониторинга сборно-разборного
              трубопровода позволяет отслеживать и отображать параметры работы
              трубопроводной системы, поступающих в реальном времени от
              удаленных контроллеров. Контролеры в свою очередь получают данные
              от датчиков, предназначенных для отслеживания процессов налива и
              слива нефтепродуктов, а также для расчета их плотности, массы,
              температуры и т.д.
            </p>
            <p>&nbsp; В системе также ведутся 4 журнала учета</p>
            <ul>
              <li>аварий и неисправностей на трубопроводе</li>
              <li>режимов работы насосных станций</li>
              <li>донесений и распоряжений</li>
              <li>параметров процесса транспортирования горючегоs</li>
            </ul>
          </header>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authReducer;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Home);
