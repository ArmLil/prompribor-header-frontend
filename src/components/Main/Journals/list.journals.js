import { Carousel } from "3d-react-carousal";
import React from "react";
import SingleJournal from "./singleJournal";

class ListJournals extends React.Component {
  render() {
    let slides = [
      <SingleJournal
        alt={1}
        name={"учета аварий и неисправностей на трубопроводе"}
        id={"avarii"}
      />,
      <SingleJournal
        alt={2}
        name={"учета режимов работы насосных станций"}
        id={"nasosi"}
      />,
      <SingleJournal
        alt={3}
        name={"учета донесений и распорежений"}
        id={"doneseni"}
      />,
    ];
    return (
      <div className="App">
        <header className="App-header">
          <h4 className="App-title">Журналы:</h4>
        </header>
        <br />
        <Carousel slides={slides} />
      </div>
    );
  }
}

export default ListJournals;
