import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

async function fetchPlaceName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'AgroSikshya/1.0 (your@email.com)' // Add your email for fair use
    }
  });
  const data = await response.json();
  return data.display_name || "";
}

function LocationMarker({ setMapCenter, setMarkerDetails }) {
  const [position, setPosition] = useState(null);
  const [details, setDetails] = useState({ name: "", description: "" });

  const map = useMapEvents({
    click: async (e) => {
      setPosition(e.latlng);
      setMapCenter([e.latlng.lat, e.latlng.lng]);
      const name = await fetchPlaceName(e.latlng.lat, e.latlng.lng);
      setDetails((prev) => ({ ...prev, name }));
      setMarkerDetails({ position: e.latlng, details: { ...details, name } });
    },
    locationfound: async (e) => {
      setPosition(e.latlng);
      setMapCenter([e.latlng.lat, e.latlng.lng]);
      const name = await fetchPlaceName(e.latlng.lat, e.latlng.lng);
      setDetails((prev) => ({ ...prev, name }));
      setMarkerDetails({ position: e.latlng, details: { ...details, name } });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    setMarkerDetails({ position, details: { ...details, [name]: value } });
  };

  return position === null ? null : (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: async (e) => {
          const marker = e.target;
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          setMapCenter([newPosition.lat, newPosition.lng]);
          const name = await fetchPlaceName(newPosition.lat, newPosition.lng);
          setDetails((prev) => ({ ...prev, name }));
          setMarkerDetails({ position: newPosition, details: { ...details, name } });
        },
      }}
    >
      <Popup>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleDetailsChange}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={details.description}
              onChange={handleDetailsChange}
            />
          </label>
        </div>
      </Popup>
    </Marker>
  );
}

export default function Region({ onFetchCrops }) {
  const [mapCenter, setMapCenter] = useState([27.7172, 85.324]);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [markerDetails, setMarkerDetails] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setMapCenter([latitude, longitude]); // Center the map on user's location
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Map & Location */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-6">
        {/* Map Card */}
        <div className="bg-[#d1fae5] rounded-xl p-4 shadow border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-500 text-2xl">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <h2 className="text-lg font-bold text-gray-800">स्थान चयन गर्नुहोस्</h2>
          </div>
          <p className="text-gray-600 mb-3 text-sm">
            तपाईंको क्षेत्रको लागि उपयुक्त बाली सुझावहरू प्राप्त गर्न स्थान चयन गर्नुहोस्
          </p>
          <div className="rounded-xl overflow-hidden border border-green-200">
            <MapContainer center={mapCenter} zoom={10} className="h-64 w-full z-10">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {markerDetails && (
                <Marker position={markerDetails.position}>
                  <Popup>
                    <div>
                      <h3 className="font-semibold">{markerDetails.details.name}</h3>
                      <p>{markerDetails.details.description}</p>
                    </div>
                  </Popup>
                </Marker>
              )}
              <LocationMarker
                setMapCenter={setMapCenter}
                setMarkerDetails={setMarkerDetails}
              />
            </MapContainer>
          </div>
          <div className="text-center mt-2 text-gray-700 font-medium">
            Interactive Map <span className="block text-xs text-gray-500">नेपालको नक्सा</span>
          </div>
        </div>
        {/* Location Info Card */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-4">
          <h3 className="font-bold text-gray-800 mb-2">
            {markerDetails?.details?.name || "काठमाडौँ"}
          </h3>
          <div className="flex flex-col gap-1 text-gray-700 text-sm">
            <span>
              <span className="font-medium">अक्षांश:</span>{" "}
              {markerDetails?.position?.lat?.toFixed(4) || "27.7172"}°
            </span>
            <span>
              <span className="font-medium">देशान्तः:</span>{" "}
              {markerDetails?.position?.lng?.toFixed(4) || "85.3240"}°
            </span>
            <span>
              <span className="font-medium">उचाइ:</span> 1400m
            </span>
          </div>
        </div>
      </div>

      {/* Right: Crop Suggestions */}
      <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-500 text-2xl">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <h2 className="text-lg font-bold text-gray-800">
              {markerDetails?.details?.name || "काठमाडौँ"} को लागि बाली सुझावहरू
            </h2>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            स्थानीय मौसम र माटोको अवस्था अनुसार सिफारिस गरिएका बालीहरू
          </p>
          {/* Sample Crop Suggestion Cards */}
          <div className="flex flex-col gap-4">
            {/* Rice */}
            <div className="bg-gray-50 rounded-xl border-l-4  p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-lg text-gray-800">धान (Rice)</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">उपयुक्त</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
                <span>🗓️ मौसम: मनसुन</span>
                <span>💧 वर्षा: 1000-2000mm</span>
                <span>🌡️ तापक्रम: 20-35°C</span>
                <span>📈 उत्पादन: 3-4 टन/हेक्टर</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">रोग्ने समय: जेठ-असार</div>
            </div>
            {/* Maize */}
            <div className="bg-gray-50 rounded-xl border-l-4  p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-lg text-gray-800">मकै (Maize)</span>
                <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">उपयुक्त</span>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
                <span>🗓️ मौसम: वर्षा/हिउँद</span>
                <span>💧 वर्षा: 500-1000mm</span>
                <span>🌡️ तापक्रम: 15-30°C</span>
                <span>📈 उत्पादन: 2-3 टन/हेक्टर</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">रोग्ने समय: चैत-बैशाख</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
