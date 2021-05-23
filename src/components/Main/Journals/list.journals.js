import { Carousel } from "3d-react-carousal";
import React, { Component } from "react";
import SingleJournal from "./singleJournal";

class ListJournals extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      var list_i_left = document.getElementsByClassName("fa fa-arrow-left");
      var list_i_right = document.getElementsByClassName("fa fa-arrow-right");
      for (let i = 0; i < list_i_left.length; ++i) {
        list_i_left[i].style.color = "#6c757d7a";
      }
      for (let i = 0; i < list_i_right.length; ++i) {
        list_i_right[i].style.color = "#6c757d7a";
      }
    }, 0);
  }

  render() {
    let slides = [
      <SingleJournal
        alt={1}
        name={"учета аварий и неисправностей на трубопроводе"}
      />,
      <SingleJournal alt={2} name={"учета режимов работы насосных станций"} />,
      <SingleJournal alt={3} name={"учета донесений и распорежений"} />,
    ];
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"></h1>
        </header>
        Журналы:
        <br />
        <br />
        <Carousel slides={slides} style={{ color: "green" }} />
      </div>
    );
  }
}

export default ListJournals;
