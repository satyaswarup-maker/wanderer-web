import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "14px",
};

// Auto fit map to show all markers
function FitBounds({ positions }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions);
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [positions, map]);
  return null;
}

// Custom numbered marker
const createNumberedIcon = (number) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1a56db, #3b82f6);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: 13px;
        font-family: Inter, sans-serif;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(26,86,219,0.4);
      ">${number}</div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });

function MapView({ stops }) {
  const validStops = stops.filter((s) => s.lat !== 0 && s.lng !== 0);

  if (validStops.length === 0) {
    return <div style={styles.loading}>No map data available</div>;
  }

  const center = [validStops[0].lat, validStops[0].lng];
  const path = validStops.map((s) => [s.lat, s.lng]);
  const positions = validStops.map((s) => [s.lat, s.lng]);

  return (
    <div style={styles.wrap}>
      <MapContainer
        center={center}
        zoom={13}
        style={mapContainerStyle}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Auto fit all markers into view */}
        <FitBounds positions={positions} />

        {validStops.map((stop) => (
          <Marker
            key={stop.index}
            position={[stop.lat, stop.lng]}
            icon={createNumberedIcon(stop.index)}
          >
            <Popup>
              <div style={{ fontFamily: "Inter, sans-serif", minWidth: 150 }}>
                <div style={{ fontWeight: 800, color: "#1e3a8a", fontSize: 14, marginBottom: 4 }}>
                  Stop {stop.index} — {stop.name}
                </div>
                {stop.time && (
                  <div style={{ color: "#3b82f6", fontSize: 12, fontWeight: 600 }}>
                    🕐 {stop.time}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        <Polyline
          positions={path}
          pathOptions={{ color: "#1a56db", weight: 3, opacity: 0.7 }}
        />
      </MapContainer>
    </div>
  );
}

const styles = {
  wrap: {
    marginBottom: 32,
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #bfdbfe",
    boxShadow: "0 2px 12px #1a56db11",
  },
  loading: {
    height: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
    fontSize: 14,
    background: "#f0f5ff",
    borderRadius: 14,
    border: "1px solid #bfdbfe",
  },
};

export default MapView;