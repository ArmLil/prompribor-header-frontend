import React, { useState, useEffect, useContext, useCallback } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import ExtMarker from "react-leaflet-enhanced-marker";
// import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import ArrowRightAltSharpIcon from "@material-ui/icons/ArrowRightAltSharp"; //right
import RedoSharpIcon from "@material-ui/icons/RedoSharp"; //rightTurn
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
// import Button from "@material-ui/core/Button";
import PlaceIcon from "@material-ui/icons/Place";

import "leaflet/dist/leaflet.css";

import fuelMarker from "../../../images/fuelMarker.png";
import explosions from "../../../images/explosions.png";
// import sklad from "../../../images/sklad1.jpg";
import sklad from "../../../images/sklad2.png";
import most from "../../../images/most.jpg";

import ParamsTable from "./paramsTable";
import Description from "./description";
// import car from "../../../images/car.jpeg";
// import Control from 'react-leaflet-control';
// import L, { LatLng, latLngBounds, FeatureGroup } from "leaflet";
import { latLngBounds } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
  Polyline,
  Popup,
  // Marker,
  LayersControl,
} from "react-leaflet";
import { SocketContext } from "../../../socket_api";

import { api } from "../../../api";
export const API_URL = `http://${api.host}:${api.port}`;
// const IMAGES_URL = `${API_URL}/images/{s}.tile.openstreetmap.org.{z}.{x}.{y}.png`;

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const { BaseLayer, Overlay } = LayersControl;
const Map = ({ commCenters, history, mapPolylinePoints, bridge }) => {
  console.log({ history }, { commCenters }, { mapPolylinePoints }, { bridge });
  const socket = useContext(SocketContext);
  const places = [];
  const polyline = [];

  const [draggable, setDraggable] = useState(false);
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
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
    { lat: Number(places[0].lat) - 0.001, len: Number(places[0].len) + 0.005 },
    {
      lat: Number(places[places.length - 1].lat) - 0.005,
      len: Number(places[places.length - 1].len) + 0.005,
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
        {places.map((place: Place) => (
          <ExtMarker
            key={place.path}
            position={place.position}
            icon={<ParamsTable commCenter={place} />}
            eventHandlers={{
              click: () => {
                console.log("second");
                // showPreview(place);
                history.push(`/main/monitoring/${place.path}`);
              },
            }}
          ></ExtMarker>
        ))}
        {places.map((place: Place) => (
          <ExtMarker
            key={place.name}
            position={place.position}
            icon={
              <img
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

        {mapPolylinePoints.map((point: Place) => {
          //arrows
          let direction = null;
          if (point.type === "right") {
            direction = "rotate(0deg)";
          }
          if (point.type === "left") {
            direction = "rotate(180deg)";
          }
          if (point.type === "upLeft") {
            direction = "rotate(-135deg)";
          }
          if (point.type === "downLeft") {
            direction = "rotate(135deg)";
          }
          if (point.type === "downRight") {
            direction = "rotate(45deg)";
          }
          if (point.type === "upRight") {
            direction = "rotate(-45deg)";
          }
          if (point.type === "up") {
            direction = "rotate(-90deg)";
          }
          if (point.type === "down") {
            direction = "rotate(90deg)";
          }
          if (direction)
            return (
              <ExtMarker
                key={point.index}
                position={[point.lat, point.len]}
                icon={
                  <ArrowRightAltSharpIcon
                    style={{
                      fontSize: "20px",
                      marginTop: "15px",
                      transform: direction,
                      color: "yellow",
                    }}
                  />
                }
              ></ExtMarker>
            );
        })}
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
              style={{
                width: "40px",
                marginTop: "15px",
              }}
            />
          }
        />
        <ExtMarker
          key={"sklad"}
          position={[56.19089, 42.85704]}
          icon={
            <img
              src={sklad}
              style={{
                width: "120px",
                marginTop: "15px",
                transform: "rotate(0deg)",
                opacity: 0.75,
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
        <CarMarker />
        <Description position="bottomright"></Description>
      </MapContainer>
    </div>
  );
};

export default Map;
