import React, { useState } from "react";
import MarkerClusterGroup from "react-leaflet-markercluster";
import ExtMarker from "react-leaflet-enhanced-marker";
import PersonPinCircleOutlinedIcon from "@material-ui/icons/PersonPinCircleOutlined";
// import Control from 'react-leaflet-control';
// import L, { LatLng, latLngBounds, FeatureGroup } from "leaflet";
import { latLngBounds } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Popup,
  Tooltip,
  useMapEvents,
  Polyline,
  useMap,
  Marker,
} from "react-leaflet";

const Map = ({ commCenters }) => {
  const places = [];
  const polyline = [];

  commCenters.forEach((item, i) => {
    places.push(Object.assign({}, item, { position: [item.lat, item.len] }));
    polyline.push([item.lat, item.len]);
  });
  const defaultPosition: LatLngExpression = [55.755826, 37.6173]; // Paris position
  const showPreview = (place) => {
    return place.toString();
  };

  function ChangeView({ center, markers }: IChangeView) {
    const map = useMap();
    let markerBounds = latLngBounds([]);
    markers.forEach((marker) => {
      markerBounds.extend([marker.lat, marker.len]);
    });
    markerBounds.isValid() && map.fitBounds(markerBounds);
    return null;
  }

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
    // marker.setIcon(<Icon> icon);
    return position === null ? null : (
      <ExtMarker
        position={position}
        icon={
          <PersonPinCircleOutlinedIcon
            style={{ fontSize: 40, opacity: "0.95", color: "#b51f1fbc" }}
          />
        }
      >
        <Popup>Вы тут!</Popup>
      </ExtMarker>
    );
  }

  return (
    <div>
      Карта коммуникационных центров
      <MapContainer
        center={defaultPosition}
        zoom={4}
        className="map__container"
        style={{ height: "420px" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeView center={defaultPosition} markers={places} />
        <MarkerClusterGroup showCoverageOnHover={true}>
          {places.map((place: Place) => (
            <Marker
              key={place.id}
              position={place.position}
              eventHandlers={{ click: () => showPreview(place) }}
            >
              {/* show place's title on hover the marker */}
              <Tooltip>{place.name}</Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>
        <Polyline pathOptions={{ color: "blue" }} positions={polyline} />
        <ExtMarker
          position={[0, 0]}
          icon={<PersonPinCircleOutlinedIcon style={{ fontSize: 40 }} />}
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
