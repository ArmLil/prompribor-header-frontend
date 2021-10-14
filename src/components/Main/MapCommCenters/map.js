import React from "react";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import ExtMarker from "react-leaflet-enhanced-marker";
// import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";

import "leaflet/dist/leaflet.css";

import fuelMarker from "../../../images/fuelMarker.png";
import explosions from "../../../images/explosions.png";
import bureya from "../../../images/bureya.png";
import sklad from "../../../images/sklad1.png";
import triangle1 from "../../../images/triangle1.png";
import triangle2 from "../../../images/triangle2.png";

import ParamsTable from "./paramsTable";
import Description from "./description";
// import car from "../../../images/car.jpeg";
// import L, { LatLng, latLngBounds, FeatureGroup } from "leaflet";
import { latLngBounds } from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  Polyline,
  // Marker,
  Tooltip,
} from "react-leaflet";

import { api } from "../../../api";
export const API_URL = `http://${api.host}:${api.port}`;
// const IMAGES_URL = `${API_URL}/images/{s}.tile.openstreetmap.org.{z}.{x}.{y}.png`;
const IMAGES_URL = `${API_URL}/Tiles/{z}/{x}/{y}.png`;
function BureyaSign() {
  return (
    <div>
      <img
        src={bureya}
        alt=""
        style={{
          width: "100px",
          marginTop: "15px",
          transform: "rotate(0deg)",
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: "relative",
          top: 2,
          left: 1,
          width: 90,
        }}
      >
        <div
          style={{
            display: "flex",
            opasity: 1,
            fontWeight: "bolder",
            backgroundColor: "white",
            justifyContent: "center",
            padding: 0,
            borderRadius: "10%",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: "bolder",
              fontSize: 14,
              color: "black",
            }}
          >
            КДП
          </p>
          <p
            style={{
              fontStyle: "italic",
              fontSize: 12,
              margin: 0,
              marginLeft: 5,
              position: "relative",
              top: 3,
              fontWeight: "bold",
              color: "black",
            }}
          >
            тпр-1
          </p>
        </div>
      </div>
    </div>
  );
}
function SkladSign() {
  return (
    <div>
      <img
        src={sklad}
        alt=""
        style={{
          width: "145px",
          marginTop: "15px",
          transform: "rotate(-0deg)",
          opacity: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          top: 0,
          left: 1,
          width: 90,
        }}
      >
        <div
          style={{
            display: "flex",
            opasity: 1,
            fontWeight: "bolder",
            backgroundColor: "white",
            justifyContent: "center",
            width: "143px",
            height: 13,
          }}
        ></div>
      </div>
    </div>
  );
}
const Map = ({ commCenters, history, mapPolylinePoints, bridge }) => {
  console.log({ history }, { commCenters }, { mapPolylinePoints }, { bridge });
  const places = [];
  const polyline = [];

  // const [draggable, setDraggable] = useState(false);
  // const toggleDraggable = useCallback(() => {
  //   setDraggable((d) => !d);
  // }, []);
  mapPolylinePoints.forEach((point, i) => {
    polyline.push([point.lat, point.len]);
  });

  commCenters.forEach((item, i) => {
    places.push(Object.assign({}, item, { position: [item.lat, item.len] }));
    // polyline.push([item.lat, item.len]);
  });
  const defaultPosition: LatLngExpression = [55.755826, 37.6173]; // Moscow position
  // const showPreview = (place) => {
  //   return place.toString();
  // };
  let changeViewMarkers = [
    { lat: Number(places[0].lat) - 0.006, len: Number(places[0].len) - 0.04 },
    {
      lat: Number(places[places.length - 1].lat) - 0.001,
      len: Number(places[places.length - 1].len) + 0.02,
    },
  ];
  changeViewMarkers = changeViewMarkers.concat(places);

  function ChangeView({ center, markers }: IChangeView) {
    const map = useMap();
    let markerBounds = latLngBounds([]);
    markers.forEach((marker) => {
      markerBounds.extend([marker.lat, marker.len]);
    });
    markerBounds.isValid() && map.fitBounds(markerBounds);
    return null;
  }

  console.log("render");
  return (
    <div>
      Автоматизированная система мониторинга сборно-разборного трубопровода
      <MapContainer
        center={defaultPosition}
        zoom={8}
        className="map__container"
        style={{ height: "80vh", zIndex: 3 }}
        doubleClickZoom={true}
        closePopupOnClick={true}
        dragging={true}
        zoomDelta={true}
        trackResize={false}
        touchZoom={true}
        scrollWheelZoom={true}
      >
        <TileLayer attribution="" url={IMAGES_URL} />

        <ChangeView center={defaultPosition} markers={changeViewMarkers} />
        {places.map((place: Place) => {
          let nameArr = place.name.split("-");
          let NameDiv = () => {
            return (
              <div style={{ display: "flex", opasity: 1, fontWeight: "bold" }}>
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: 13,
                  }}
                >
                  {nameArr[0]}
                </p>

                <p
                  style={{
                    fontSize: 11,
                    margin: 0,
                    padding: 0,
                    position: "relative",
                    top: 2,
                  }}
                >
                  -{nameArr[1]}
                </p>
              </div>
            );
          };
          let tooltipOffset = [0, -12];

          if (place.path === "GNS5") {
            tooltipOffset = [9, -12];
          }
          if (place.path === "GNS6") {
            tooltipOffset = [-4, -12];
          }
          return (
            <ExtMarker
              key={place.name}
              position={place.position}
              icon={<ParamsTable commCenter={place} />}
              eventHandlers={{
                click: () => {
                  console.log("second");
                  // showPreview(place);
                  history.push(`/main/monitoring/${place.path}`);
                },
              }}
            >
              <Tooltip
                direction={"top"}
                offset={tooltipOffset}
                opacity={1}
                permanent
              >
                {<NameDiv />}
              </Tooltip>
            </ExtMarker>
          );
        })}
        {places.map((place: Place) => (
          <ExtMarker
            key={place.len}
            position={place.position}
            icon={
              <img
                alt=""
                src={fuelMarker}
                style={{
                  width: "20px",
                  marginTop: "15px",
                }}
              />
            }
            eventHandlers={{
              click: () => {
                console.log({ place });
                // showPreview(place);
                history.push(`/main/journals/${place.path}`);
              },
            }}
          ></ExtMarker>
        ))}

        {bridge.map((typeArray, index) => {
          typeArray.sort(function (a, b) {
            return a.index - b.index;
          });
          let coords = [];
          typeArray.forEach((item, i) => {
            coords.push([item.lat, item.len]);
          });
          let color = "black";
          if (typeArray[0].type.charAt(0) === "2") {
            color = "green";
          }

          return (
            <Polyline
              key={index}
              pathOptions={{
                color: color,
                weight: 3,
                lineCap: "butt",
                opacity: 0.8,
              }}
              positions={coords}
            />
          );
        })}
        <ExtMarker
          key={"fire"}
          position={[56.18648, 42.85888]}
          icon={
            <img
              src={explosions}
              alt=""
              style={{
                width: "40px",
                marginTop: "15px",
              }}
            />
          }
        />
        <ExtMarker
          key={"sklad"}
          position={[56.19097, 42.85788]}
          icon={<SkladSign />}
        ></ExtMarker>

        <ExtMarker
          key="bureya sign"
          position={[56.18607, 42.87419]}
          icon={<BureyaSign />}
        ></ExtMarker>

        <ExtMarker
          key={"NS-5"}
          position={[56.18538, 42.87239]}
          icon={
            <img
              src={triangle2}
              alt=""
              style={{
                width: "30px",
                marginTop: "15px",
                transform: "rotate(0deg)",
                opacity: 1,
              }}
            />
          }
        />
        <ExtMarker
          key={"NS-1"}
          position={[56.18397, 42.89947]}
          icon={
            <img
              src={triangle1}
              alt=""
              style={{
                width: "30px",
                marginTop: "15px",
                transform: "rotate(0deg)",
                opacity: 1,
              }}
            />
          }
        />
        <ExtMarker
          key={"NS-3"}
          position={[56.18961, 42.88659]}
          icon={
            <img
              src={triangle1}
              alt=""
              style={{
                width: "30px",
                marginTop: "15px",
                transform: "rotate(0deg)",
                opacity: 1,
              }}
            />
          }
        />
        <ExtMarker
          key={"NS-7"}
          position={[56.19018, 42.85516]}
          icon={
            <img
              src={triangle1}
              alt=""
              style={{
                width: "30px",
                marginTop: "15px",
                transform: "rotate(0deg)",
                opacity: 1,
              }}
            />
          }
        />
        <Polyline
          pathOptions={{
            color: "green",
            weight: 8,
            lineCap: "butt",
            opacity: 0.8,
          }}
          positions={polyline}
        />
        <Description position="bottomright"></Description>
      </MapContainer>
    </div>
  );
};

export default Map;
