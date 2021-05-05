import React, { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
} from "react-leaflet";
import { connect } from "react-redux";
import { getData } from "../../actions/data";

const AddMarker = () => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: (e) => {
      setPosition(e.latlng); // 👈 add marker

      /* CODE TO ADD NEW PLACE TO STORE (check the source code) */
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const places = [{ id: "1", name: "Moscow", position: [51.505, -0.09] }];

const Map = () => {
  const defaultPosition: LatLngExpression = [51.505, -0.09]; // Paris position
  const showPreview = (place) => {
    return place.toString();
  };
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  return (
    <div>
      Карта коммуникационных центров
      <MapContainer
        center={defaultPosition}
        zoom={13}
        className="map__container"
        style={{ height: "420px" }}
      >
        {places.map((place: Place) => (
          <Marker
            key={place.id}
            position={place.position} // 👈
            eventHandlers={{ click: () => showPreview(place) }}
          >
            {/* show place's title on hover the marker */}
            <Tooltip>{place.name}</Tooltip>
          </Marker>
        ))}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
