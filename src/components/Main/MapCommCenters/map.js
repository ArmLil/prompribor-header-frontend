import React, { useState, useEffect, useContext } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import ExtMarker from "react-leaflet-enhanced-marker";
// import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
// import Button from "@material-ui/core/Button";
import PlaceIcon from "@material-ui/icons/Place";
import "leaflet/dist/leaflet.css";

// import car from "../../../images/car.jpeg";
// import Control from 'react-leaflet-control';
// import L, { LatLng, latLngBounds, FeatureGroup } from "leaflet";
import { latLngBounds } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Tooltip,
  Polyline,
  useMap,
  // Marker,
} from "react-leaflet";
import { SocketContext } from "../../../socket_api";

import { api } from "../../../api";
export const API_URL = `http://${api.host}:${api.port}`;
// const IMAGES_URL = `${API_URL}/images/{s}.tile.openstreetmap.org.{z}.{x}.{y}.png`;

const Map = ({ commCenters, history }) => {
  console.log({ history });
  const socket = useContext(SocketContext);
  const places = [];
  const polyline = [];

  polyline.push([commCenters[0].lat, commCenters[0].len]);
  polyline.push([56.298119030271884, 42.69747903460672]);
  polyline.push([56.2948327769903, 42.71240785375273]);
  polyline.push([56.28752100820184, 42.72038724745659]);

  polyline.push([commCenters[1].lat, commCenters[1].len]);
  commCenters.forEach((item, i) => {
    places.push(Object.assign({}, item, { position: [item.lat, item.len] }));
    // polyline.push([item.lat, item.len]);
  });
  const defaultPosition: LatLngExpression = [55.755826, 37.6173]; // Paris position
  // const showPreview = (place) => {
  //   return place.toString();
  // };

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
      let isMounted = true;
      const carPositionListeners = (data) => {
        console.log("socket on carPostion");
        console.log(data.latlen);
        console.log("carPosition=", carPosition);
        if (isMounted && carPosition !== data.latlen) {
          setCarPosition(data.latlen);
        }
      };
      socket.on("carPostion", carPositionListeners);
      return () => {
        isMounted = false;
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
  //   <Tooltip>{place.name}</Tooltip>
  // </Marker>
  //https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

  return (
    <div>
      Карта коммуникационных центров
      <MapContainer
        center={defaultPosition}
        zoom={4}
        className="map__container"
        style={{ height: "550px" }}
        doubleClickZoom={true}
        closePopupOnClick={true}
        dragging={true}
        zoomSnap={true}
        zoomDelta={true}
        trackResize={true}
        touchZoom={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={defaultPosition} markers={places} />
        <MarkerClusterGroup showCoverageOnHover={true}>
          {places.map((place: Place) => (
            <ExtMarker
              key={place.name}
              position={place.position}
              icon={
                <PlaceIcon
                  style={{ fontSize: 30, opacity: "0.95", color: "#4791db" }}
                />
              }
              eventHandlers={{
                click: () => {
                  // showPreview(place);
                  history.push("/main/journals");
                },
              }}
            >
              <Tooltip>{place.name}</Tooltip>
            </ExtMarker>
          ))}
        </MarkerClusterGroup>
        <Polyline pathOptions={{ color: "blue" }} positions={polyline} />
        <CarMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
