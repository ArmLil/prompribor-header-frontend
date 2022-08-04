import React, { useEffect } from "react";
// import MarkerClusterGroup from "react-leaflet-markercluster";
import ExtMarker from "react-leaflet-enhanced-marker";
// import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";

import "leaflet/dist/leaflet.css";

import fuelMarker from "../../../images/fuelMarker.png";
import psg from "../../../images/psg.png";
import ParamsTable from "./paramsTable";
import Description from "./description";
// import car from "../../../images/car.jpeg";

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

function PSG() {
  return (
    <div>
      <img
        src={psg}
        alt=""
        style={{
          width: "80px",
          // marginTop: "15px",
          transform: "rotate(-0deg)",
          opacity: 1,
        }}
      />
    </div>
  );
}
const Map = ({ commCenters, history, mapPolylinePoints }) => {
  // console.log({ history }, { commCenters }, { mapPolylinePoints });
  const places = [];
  const polyline = [];

  // const [draggable, setDraggable] = useState(false);
  // const toggleDraggable = useCallback(() => {
  //   setDraggable((d) => !d);
  // }, []);
  mapPolylinePoints.forEach((point, i) => {
    polyline.push([point.lat, point.lon]);
  });

  commCenters.forEach((item, i) => {
    places.push(Object.assign({}, item, { position: [item.lat, item.lon] }));
    // polyline.push([item.lat, item.lon]);
  });
  const defaultPosition: LatLngExpression = [56.29676, 42.68312]; // index 175 position
  // const showPreview = (place) => {
  //   return place.toString();
  // };

  let changeViewMarkers = [];
  useEffect(() => {
    const updateViewMarkers = () => {
      mapPolylinePoints.forEach((point, i) => {
        changeViewMarkers.push({ lat: point.lat, lon: point.lon });
      });
      changeViewMarkers = changeViewMarkers.concat(places);
    };
    updateViewMarkers();
  }, []);

  setTimeout(() => {
    let list = document.getElementsByClassName("leaflet-tooltip");
    for (var item of list) {
      item.style.padding = "1px";
    }
  }, 0);

  function ChangeView({ center, markers }: IChangeView) {
    const map = useMap();
    let markerBounds = latLngBounds([]);
    markers.forEach((marker) => {
      markerBounds.extend([marker.lat, marker.lon]);
    });
    markerBounds.isValid() && map.fitBounds(markerBounds);
    return null;
  }

  return (
    <div>
      Автоматизированная система мониторинга сборно-разборного трубопровода
      <MapContainer
        center={defaultPosition}
        zoom={10}
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
                  {place.name}
                </p>
              </div>
            );
          };
          let tooltipOffset = [2, -12];
          let direction = "top";

          if (place.path === "NS-1") {
            tooltipOffset = [-10, 10];
            direction = "bottom";
          }
          return (
            <ExtMarker
              key={place.name}
              position={place.position}
              icon={<ParamsTable commCenter={place} />}
              eventHandlers={{
                click: () => {
                  // showPreview(place);
                  history.push(`/main/monitoring/${place.path}`);
                },
              }}
            >
              <Tooltip
                direction={direction}
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
            key={place.path}
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
                // showPreview(place);
                history.push(`/main/journals/${place.path}`);
              },
            }}
          ></ExtMarker>
        ))}

        <ExtMarker
          key={"psg"}
          position={[56.30179, 42.68798]}
          icon={<PSG />}
        ></ExtMarker>

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
