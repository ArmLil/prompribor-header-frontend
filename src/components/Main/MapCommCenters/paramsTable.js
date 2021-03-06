export default function ParamsTable(data) {
  // console.log(data.commCenter.controllers[1].registers);

  let commCenter = data.commCenter;
  let lineStyle = {
    width: "15px",
    borderTop: "2px solid green",
    position: "relative",
  };
  let tableStyle = {
    border: "1px solid black",
    fontSize: 11,
    fontWeight: "bolder",
    backgroundColor: "#FDD495E6",
    color: "black",
  };

  if (commCenter.tablePosition === "right") {
    tableStyle = Object.assign({}, tableStyle, {
      position: "relative",
      left: 76,
      bottom: 30,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 60,
      top: 25,
      // transform: "rotate(180deg)",
    });
  } else if (commCenter.tablePosition === "top") {
    tableStyle = Object.assign({}, tableStyle, {
      position: "relative",
      bottom: 170,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 44,
      top: 5,
      width: "15px",
      transform: "rotate(90deg)",
    });
  } else if (commCenter.tablePosition === "left") {
    tableStyle = Object.assign({}, tableStyle, {
      position: "relative",
      right: 85,
      bottom: 40,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 24,
      top: 24,
      width: "15px",
    });
  } else if (commCenter.tablePosition === "bottom") {
    tableStyle = Object.assign({}, tableStyle, {
      position: "relative",
      top: 50,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 42,
      top: 43,
      width: "15px",
      transform: "rotate(90deg)",
    });
  } else if (commCenter.tablePosition === "bottom-left") {
    tableStyle = Object.assign({}, tableStyle, {
      position: "relative",
      right: 52,
      top: 42,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 25,
      top: 38,
      width: "18px",
      transform: "rotate(145deg)",
    });
  } else if (commCenter.tablePosition === "top-left") {
    tableStyle = Object.assign({}, tableStyle, {
      position: "relative",
      right: 80,
      bottom: 160,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 28,
      top: 8,
      transform: "rotate(50deg)",
      width: "18px",
    });
  } else if (commCenter.tablePosition === "top-right") {
    tableStyle = Object.assign({}, tableStyle, {
      position: "relative",
      left: 70,
      bottom: 150,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 55,
      top: 10,
      transform: "rotate(135deg)",
      width: "18px",
    });
  } else if (commCenter.tablePosition === "bottom-right") {
    tableStyle = Object.assign({}, tableStyle, {
      position: "relative",
      left: 30,
      top: 45,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 55,
      top: 38,
      transform: "rotate(45deg)",
      width: "18px",
    });
  }
  let fuelStyle = Object.assign({}, {}, tableStyle, {
    height: "100px",
    backgroundColor: "#fbcbb4c4",
  });
  let nasosiStyle = Object.assign({}, tableStyle, {
    height: "52px",
    backgroundColor: "#f4d9909c",
  });
  let pStyle = {
    padding: 0,
    margin: 0,
    color: "black",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-around",
  };
  let P_out,
    P_in,
    revs,
    temperature,
    density,
    current_volume,
    current_mass,
    total_volume,
    total_mass;
  commCenter.controllers.forEach((contr, i) => {
    contr.registers.forEach((reg, i) => {
      if (reg.name === "revs") revs = reg.Registers_Controllers_values.value;
      if (reg.name === "P_in") P_in = reg.Registers_Controllers_values.value;
      if (reg.name === "P_out") P_out = reg.Registers_Controllers_values.value;
      if (reg.name === "temperature")
        temperature = reg.Registers_Controllers_values.value;
      if (reg.name === "density")
        density = reg.Registers_Controllers_values.value;
      if (reg.name === "current_volume")
        current_volume = reg.Registers_Controllers_values.value;
      if (reg.name === "current_mass")
        current_mass = reg.Registers_Controllers_values.value;
      if (reg.name === "total_volume")
        total_volume = reg.Registers_Controllers_values.value;
      if (reg.name === "total_mass")
        total_mass = reg.Registers_Controllers_values.value;
    });
  });
  return (
    <div style={{ width: "105px" }}>
      <div style={lineStyle}></div>
      <div style={nasosiStyle}>
        <p style={pStyle}> P????, {P_in} (??????)</p>
        <p style={pStyle}> P??????, {P_out} (??????)</p>
        <p style={pStyle}>n, {revs} (????/??????)</p>
      </div>
      <div style={fuelStyle}>
        <p style={pStyle}>Q, {current_volume} (??3/??)</p>
        <p style={pStyle}>??, {density} (????/??3)</p>
        <p style={pStyle}> t, {temperature} (??C)</p>
        <p style={pStyle}> V, {total_volume} (??3)</p>
        <p style={pStyle}> m, {current_mass} (??/??)</p>
        <p style={pStyle}> M, {total_mass} (??)</p>
      </div>
    </div>
  );
}
