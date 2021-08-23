import React, { useState, useEffect, useContext } from "react";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import ExtMarker from "react-leaflet-enhanced-marker";
// import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

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
  SVGOverlay,
  Tooltip,
} from "react-leaflet";
import { SocketContext } from "../../../socket_api";

import { api } from "../../../api";
export const API_URL = `http://${api.host}:${api.port}`;
// const IMAGES_URL = `${API_URL}/images/{s}.tile.openstreetmap.org.{z}.{x}.{y}.png`;
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
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: "bolder",
              fontSize: 14,
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
  const socket = useContext(SocketContext);
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

  // function LocationMarker() {
  //   const [position, setPosition] = useState(null);
  //   const map = useMapEvents({
  //     click() {
  //       map.locate();
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng);
  //       map.flyTo(e.latlng, map.getZoom());
  //     },
  //   });
  //   // marker.setIcon(<Icon> icon);
  //   return position === null ? null : (
  //     <ExtMarker
  //       position={position}
  //       icon={
  //         <PersonPinCircleOutlinedIcon
  //           style={{ fontSize: 40, opacity: "0.95", color: "#b51f1fbc" }}
  //         />
  //       }
  //     >
  //       <Popup>Вы тут!</Popup>
  //     </ExtMarker>
  //   );
  // }
  // <LocationMarker />

  function CarMarker() {
    const [carPosition, setCarPosition] = useState([56.301, 42.688]);
    useEffect(() => {
      // let isMounted = true;
      const carPositionListeners = (data) => {
        console.log("socket on carPostion");
        console.log(data.latlen);
        console.log("carPosition=", carPosition);
        if (carPosition !== data.latlen) {
          setCarPosition(data.latlen);
        }
      };
      socket.on("carPostion", carPositionListeners);
      return () => {
        // isMounted = false;
        socket.off("carPostion", carPositionListeners);
      };
    }, [carPosition]);
    // icon={<img src={car} style={{ width: "40px" }} />}
    return (
      <ExtMarker
        position={carPosition}
        icon={
          <LocalShippingIcon
            style={{ fontSize: 40, opacity: "0.95", color: "green" }}
          />
        }
      />
    );
  }

  // <Marker
  //   key={place.name}
  //   position={place.position}
  //   eventHandlers={{
  //     click: () => {
  //       // showPreview(place);
  //       history.push("/main/journals");
  //     },
  //   }}
  // >
  //   {/* show place's title on hover the marker */}
  //               <Tooltip direction="top" offset={[0, -12]} opacity={0.6} permanent>{place.name}</Tooltip>
  // </Marker>
  //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  // icon={
  //   <PlaceIcon
  //     style={{ fontSize: 30, opacity: "0.95", color: "#4791db" }}
  //   />
  // }
  // <TileLayer
  //   attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  //   url="https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  // />
  // <CarMarker />

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
        <TileLayer
          attribution=""
          url="https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeView center={defaultPosition} markers={changeViewMarkers} />
        {places.map((place: Place) => {
          let placeName = "";
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
          let tooltipDirection = "top";
          let tooltipOffset = [0, -12];
          let tooltipStyle = {};
          if (place.tablePosition === "top-left") {
            tooltipDirection = "top-right";
          }
          if (place.tablePosition === "top-right") {
            tooltipDirection = "top-left";
          }
          if (place.tablePosition === "bottom-left") {
            tooltipDirection = "bottom-right";
          }
          if (place.tablePosition === "bottom-right") {
            tooltipDirection = "bottom-left";
            tooltipStyle = { position: "relative", bottom: 10 };
          }
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
