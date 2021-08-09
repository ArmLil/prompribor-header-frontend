import ArrowRightAltSharpIcon from "@material-ui/icons/ArrowRightAltSharp";

export default function ParamsTable(data) {
  // console.log(data.commCenter);
  let commCenter = data.commCenter;
  let lineStyle = {
    width: "30px",
    borderTop: "2px solid green",
    position: "relative",
  };
  let titleStyle = {
    border: "1px solid black",
    height: 20,
    fontSize: 10,
    fontWeight: "bolder",
    backgroundColor: "#FDD495E6",
    color: "black",
  };

  if (commCenter.tablePosition === "right") {
    titleStyle = Object.assign({}, titleStyle, {
      position: "relative",
      left: 80,
      bottom: 30,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 62,
      top: 25,
      // transform: "rotate(180deg)",
    });
  } else if (commCenter.tablePosition === "top") {
    titleStyle = Object.assign({}, titleStyle, {
      position: "relative",
      bottom: 170,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 38,
      top: 3,
      width: "25px",
      transform: "rotate(90deg)",
    });
  } else if (commCenter.tablePosition === "left") {
    titleStyle = Object.assign({}, titleStyle, {
      position: "relative",
      right: "81%",
      bottom: 40,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 18,
      top: 22,
      width: "20px",
    });
  } else if (commCenter.tablePosition === "bottom") {
    titleStyle = Object.assign({}, titleStyle, {
      position: "relative",
      top: 60,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 39,
      top: 45,
      width: "23px",
      transform: "rotate(90deg)",
    });
  } else if (commCenter.tablePosition === "bottom-left") {
    titleStyle = Object.assign({}, titleStyle, {
      position: "relative",
      right: 50,
      top: 50,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 5,
      top: 40,
      width: "30px",
      transform: "rotate(145deg)",
    });
  } else if (commCenter.tablePosition === "top-left") {
    titleStyle = Object.assign({}, titleStyle, {
      position: "relative",
      right: 80,
      bottom: 130,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 20,
      top: 5,
      transform: "rotate(58deg)",
      width: "32px",
    });
  } else if (commCenter.tablePosition === "top-right") {
    titleStyle = Object.assign({}, titleStyle, {
      position: "relative",
      left: 80,
      bottom: 130,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 55,
      top: 5,
      transform: "rotate(135deg)",
      width: "30px",
    });
  } else if (commCenter.tablePosition === "bottom-right") {
    titleStyle = Object.assign({}, titleStyle, {
      position: "relative",
      left: 80,
      top: 50,
    });
    lineStyle = Object.assign({}, lineStyle, {
      position: "relative",
      left: 55,
      top: 40,
      transform: "rotate(27deg)",
      width: "38px",
    });
  }
  let fuelStyle = Object.assign({}, {}, titleStyle, {
    height: "95px",
    backgroundColor: "#fbcbb4c4",
  });
  let nasosiStyle = Object.assign({}, titleStyle, {
    height: "50px",
    backgroundColor: "#f4d9909c",
  });
  // <div style={lineStyle}></div>
  let pStyle = { padding: 0, margin: 0, color: "black" };
  let fuelController = [];
  let nasosiController = [];
  let P_out,
    P_in,
    revs,
    temperature,
    density,
    current_volume,
    currentMass,
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
      if (reg.name === "currentMass")
        currentMass = reg.Registers_Controllers_values.value;
      if (reg.name === "total_volume")
        total_volume = reg.Registers_Controllers_values.value;
      if (reg.name === "total_mass")
        total_mass = reg.Registers_Controllers_values.value;
    });
  });

  return (
    <div style={{ width: "110px" }}>
      <div style={lineStyle}></div>
      <div style={titleStyle}>
        <p>{commCenter.name}</p>
      </div>

      <div style={nasosiStyle}>
        <p style={pStyle}> Pвх, {P_in} (МПа)</p>
        <p style={pStyle}> Pвых, {P_out} (МПа)</p>
        <p style={pStyle}>n, {revs} (об/мин)</p>
      </div>
      <div style={fuelStyle}>
        <p style={pStyle}>Q, {current_volume} (м3/ч)</p>
        <p style={pStyle}>ρ, {density} (кг/м3)</p>
        <p style={pStyle}> t, {temperature} (°C)</p>
        <p style={pStyle}> V, {total_volume} (м3)</p>
        <p style={pStyle}> m, {currentMass} (т/ч)</p>
        <p style={pStyle}> M, {total_mass} (тонны)</p>
      </div>
    </div>
  );
}
