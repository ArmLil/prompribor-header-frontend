import fuelMarker from "../../../images/fuelMarker.png";
import explosions from "../../../images/explosions.png";
// import sklad from "../../../images/sklad1.jpg";
import sklad from "../../../images/sklad2.png";
import most from "../../../images/most.jpg";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const rootStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  border: "1px solid #afb1b1",
  backgroundColor: "#f2f5f5",
  width: "220px",
  zIndex: 100,
  fontSize: 12,
  margin: 0,
  position: "relative",
  top: 8,
  left: 8,
};

function Content() {
  return (
    <div style={rootStyle}>
      <div style={{ alignSelf: "flex-start" }}>
        <img
          alt=""
          src={fuelMarker}
          style={{
            width: "15px",
            margin: "5px",
          }}
        />
        - газонаполнительная станция
      </div>
      <div style={{ alignSelf: "flex-start" }}>
        <img
          src={explosions}
          alt=""
          style={{
            width: "15px",
            margin: "5px",
          }}
        />
        - взрыв на мосту
      </div>
      <div style={{ alignSelf: "flex-start" }}>
        <img
          src={most}
          alt=""
          style={{
            width: "20px",
            margin: "5px",
          }}
        />
        - мосты
      </div>
      <div style={{ alignSelf: "flex-start" }}>
        <img
          src={sklad}
          alt=""
          style={{
            width: "30px",
            margin: "5px",
            marginBottom: "0px",
          }}
        />
        - склад горючего
      </div>
      <div style={{ alignSelf: "flex-start" }}>
        <RemoveSharpIcon
          style={{
            width: "31px",
            margin: "2px",
            color: "green",
            fontSize: "28px",
          }}
        />
        - трубопровод
      </div>
    </div>
  );
}

export default function Description({ position }) {
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
  return (
    <div className={positionClass}>
      <Content />
    </div>
  );
}
