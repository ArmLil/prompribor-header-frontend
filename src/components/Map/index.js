import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  const defaultPosition: LatLngExpression = [48.864716, 2.349]; // Paris position

  return (
    <div className="map__container" style={{ height: "100%" }}>
      <MapContainer center={defaultPosition} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default Map;
