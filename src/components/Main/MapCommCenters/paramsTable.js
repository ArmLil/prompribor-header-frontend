import ArrowRightAltSharpIcon from "@material-ui/icons/ArrowRightAltSharp"; //right

export default function ParamsTable(data) {
  console.log(data.commCenter.tablePosition);
  let commCenter = data.commCenter;
  let lineStyle = {
    width: "35px",
    height: "0",
    borderTop: "2px solid green",
    position: "relative",
  };
  let tableStyle = { border: "2px solid green", margin: 1 };
  if (commCenter.tablePosition === "right") {
    tableStyle = Object.assign(tableStyle, {
      position: "relative",
      left: 95,
      top: 10,
    });
    lineStyle = Object.assign(lineStyle, {
      position: "relative",
      left: 62,
      top: 0,
      // transform: "rotate(180deg)",
    });
  } else if (commCenter.tablePosition === "top") {
    tableStyle = Object.assign(tableStyle, {
      position: "relative",
      bottom: 33,
    });
    lineStyle = Object.assign(lineStyle, {
      position: "relative",
      left: 40,
      bottom: 23,
      width: "23px",
      transform: "rotate(90deg)",
    });
  } else if (commCenter.tablePosition === "left") {
    tableStyle = Object.assign(tableStyle, {
      position: "relative",
      right: 95,
      top: 10,
    });
    lineStyle = Object.assign(lineStyle, {
      position: "relative",
      left: 3,
      bottom: 0,
    });
  } else if (commCenter.tablePosition === "bottom") {
    tableStyle = Object.assign(tableStyle, { position: "relative", top: 60 });
    lineStyle = Object.assign(lineStyle, {
      position: "relative",
      left: 39,
      top: 25,
      width: "23px",
      transform: "rotate(90deg)",
    });
  } else if (commCenter.tablePosition === "bottom-left") {
    tableStyle = Object.assign(tableStyle, {
      position: "relative",
      right: 50,
      top: 50,
    });
    lineStyle = Object.assign(lineStyle, {
      position: "relative",
      left: 5,
      top: 17,
      transform: "rotate(145deg)",
    });
  } else if (commCenter.tablePosition === "top-left") {
    tableStyle = Object.assign(tableStyle, {
      position: "relative",
      right: 40,
      bottom: 20,
    });
    lineStyle = Object.assign(lineStyle, {
      position: "relative",
      left: 12,
      bottom: 15,
      transform: "rotate(27deg)",
      width: "32px",
    });
  } else if (commCenter.tablePosition === "top-right") {
    tableStyle = Object.assign(tableStyle, {
      position: "relative",
      left: 30,
      bottom: 20,
    });
    lineStyle = Object.assign(lineStyle, {
      position: "relative",
      left: 55,
      bottom: 16,
      transform: "rotate(153deg)",
      width: "30px",
    });
  } else if (commCenter.tablePosition === "bottom-right") {
    tableStyle = Object.assign(tableStyle, {
      position: "relative",
      left: 50,
      top: 50,
    });
    lineStyle = Object.assign(lineStyle, {
      position: "relative",
      left: 55,
      top: 18,
      transform: "rotate(27deg)",
      width: "38px",
    });
  }

  return (
    <div style={{ padding: 0 }}>
      <div style={tableStyle}>{commCenter.name}</div>
      <div style={lineStyle}></div>
    </div>
  );
}
