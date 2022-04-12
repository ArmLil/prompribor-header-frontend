import { Carousel } from "3d-react-carousal";
import React from "react";
import SingleJournal from "./singleJournal";
console.log("listjouranl");
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
    name={"учета донесений и распоряжений"}
    id={"donesenii"}
  />,
  <SingleJournal
    alt={4}
    name={"учёта параметров процесса транспортирования горючего"}
    id={"fuel"}
  />,
];
let locationJournal = window.location.pathname.split("/").slice(-1)[0];

const replaceSlides = (_slides, beFirstSlide) => {
  console.log({beFirstSlide});
  let result = [..._slides];
  let elem = _slides.find((sl) => {
    console.log({sl});
    return sl.props.id === beFirstSlide;
  });
  console.log({elem});
  let indexBeFirst = _slides.indexOf(elem);
  if (elem) {
    for (let i = 0; i < indexBeFirst; ++i) {
      result.push(_slides[i]);
      result.splice(0, 1);
    }
  }
  // let journals = result.map(sl => sl.props.id)
  // console.log(journals);
  return result;
};

let replacedSlides = replaceSlides(slides, locationJournal);
console.log({replacedSlides});

class ListJournals extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h4 className="App-title">Журналы:</h4>
        </header>
        <br />
        <Carousel slides={replacedSlides} />
      </div>
    );
  }
}

export default ListJournals;
