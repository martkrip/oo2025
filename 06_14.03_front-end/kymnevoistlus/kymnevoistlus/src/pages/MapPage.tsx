import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function MapPage() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer center={[59.436, 24.752]} zoom={0} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[59.436, 24.755]}>
          <Popup>
            Martini elukoht näide
          </Popup>
        </Marker>
        <Marker position={[40.7046, -73.8721]}>
          <Popup>
            Alex elukoht
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapPage;