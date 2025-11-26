import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import { useTextLang } from "../../libs/utils";

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

function LocationMarker({ setMapCenter, setMarkerDetails, fetchDataOnMarkerChange }) {
  const [position, setPosition] = useState(null);
  const [details, setDetails] = useState({ name: "", description: "" });

  const map = useMapEvents({
    click: async (e) => {
      setPosition(e.latlng);
      setMapCenter([e.latlng.lat, e.latlng.lng]);
      const name = await fetchPlaceName(e.latlng.lat, e.latlng.lng);
      setDetails((prev) => ({ ...prev, name }));
      setMarkerDetails({ position: e.latlng, details: { ...details, name } });
      fetchDataOnMarkerChange(name);
    },
    locationfound: async (e) => {
      setPosition(e.latlng);
      setMapCenter([e.latlng.lat, e.latlng.lng]);
      const name = await fetchPlaceName(e.latlng.lat, e.latlng.lng);
      setDetails((prev) => ({ ...prev, name }));
      setMarkerDetails({ position: e.latlng, details: { ...details, name } });
      fetchDataOnMarkerChange(name);

      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    setMarkerDetails({ position, details: { ...details, [name]: value } });
    fetchDataOnMarkerChange(name);
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
          fetchDataOnMarkerChange()
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
  const [fetchCrops, setFetchCrops] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setMapCenter([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );


  }, []);

  const language = useStore((state) => state.language);

  const handleClickOnCrop = (crop) => {
    console.log("current crops is :", crop)
    if (crop.includes('Cauliflower')) {
      navigate('/courses/player/cauliflower-farming')
    }
  };

  const fetchDataOnMarkerChange = async (placeName) => {
    if (!placeName) return;
    setLoading(true);
    const res = await axios.post(
      "http://localhost:3000/crops",
      { location: placeName },
      { headers: { "Content-Type": "application/json" } }
    );
    setFetchCrops(res.data);
    console.log(res.data);
    setLoading(false);
  };

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
            <h2 className="text-lg font-bold text-gray-800">{useTextLang("Select Location", "स्थान चयन गर्नुहोस्")}</h2>
          </div>
          <p className="text-gray-600 mb-3 text-sm">
            {useTextLang("Select a location to get suitable crop suggestions for your area", "तपाईंको क्षेत्रको लागि उपयुक्त बाली सुझावहरू प्राप्त गर्न स्थान चयन गर्नुहोस्")}
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
                fetchDataOnMarkerChange={fetchDataOnMarkerChange}
              />
            </MapContainer>
          </div>
          <div className="text-center mt-2 text-gray-700 font-medium">
            {useTextLang("Interactive Map", "अन्तरक्रियात्मक नक्सा")} <span className="block text-xs text-gray-500">{useTextLang("Map of Nepal", "नेपालको नक्सा")}</span>
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
        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-green-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-green-700 font-semibold">{useTextLang("Loading soil Data...", "माटोको डाटा लोड हुँदैछ...")}</span>
          </div>
        )}

        {!loading && fetchCrops?.recommended_agri_business && fetchCrops.recommended_agri_business.length > 0 && (
          <>
            <SoilDetailsCard soilDetails={fetchCrops?.soil_details} language={language} />
            <FinalConclusionCard finalConclusion={fetchCrops?.final_conclusion} language={language} />
          </>
        )}
      </div>

      {/* Right: Crop Suggestions */}
      <div className="relative bg-white rounded-2xl shadow p-6 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-500 text-2xl">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <h2 className="text-lg font-bold text-gray-800">
              {useTextLang(`Crop suggestions for ${markerDetails?.details?.name || "Kathmandu"}`, `${markerDetails?.details?.name || "काठमाडौँ"} को लागि बाली सुझावहरू`)}
            </h2>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            {useTextLang("Recommended crops based on local weather and soil conditions", "स्थानीय मौसम र माटोको अवस्था अनुसार सिफारिस गरिएका बालीहरू")}
          </p>
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-green-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <span className="text-green-700 font-semibold">{useTextLang("Loading crop suggestions...", "बाली सुझावहरू लोड हुँदैछ...")}</span>
            </div>
          )}
          {/* Sample Crop Suggestion Cards */}
          <div className="flex flex-col gap-4">
            {/* Rice */}
            {!loading && (!fetchCrops?.recommended_agri_business || fetchCrops.recommended_agri_business.length === 0) && (
              <div className="flex flex-col items-center justify-center py-8">
                <svg className="h-12 w-12 text-gray-300 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-gray-500 font-semibold text-lg">{useTextLang("No crop suggestions found for this location.", "यस स्थानको लागि कुनै बाली सुझाव फेला परेन।")}</span>
              </div>
            )}

            {/* Crop Suggestions */}
            {!loading && fetchCrops?.recommended_agri_business && fetchCrops.recommended_agri_business.length > 0 && (
              <div className="sticky top-0 flex flex-col gap-4 cursor-pointer">
                {fetchCrops.recommended_agri_business.map((crop, idx) => {
                  return (
                    <div onClick={() => handleClickOnCrop(crop.name)} key={idx} className="bg-gray-50 rounded-xl border-l-4 border-green-400 p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-lg text-gray-800">{crop.name}</span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {language == "en" ? crop.suitability?.en : crop.suitability?.np}
                        </span>
                      </div>
                      {/* Type field */}
                      <div className="mb-2">
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                          {crop.type}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-2">
                        {crop.season && (
                          <span>
                            🗓️ मौसम: {language == "en" ? crop.season?.en : crop.season?.np}
                          </span>
                        )}
                        {crop.rainfall && (
                          <span>
                            💧 वर्षा: {language == "en" ? crop.rainfall?.en : crop.rainfall?.np}
                          </span>
                        )}
                        {crop.temperature && (
                          <span>
                            🌡️ तापक्रम: {language == "en" ? crop.temperature?.en : crop.temperature?.np}
                          </span>
                        )}
                        {crop.productivity && (
                          <span>
                            📈 उत्पादन: {language == "en" ? crop.productivity?.en : crop.productivity?.np}
                          </span>
                        )}
                      </div>
                      {crop.planting_time && (
                        <div className="text-xs text-gray-500 mt-2">
                          रोग्ने समय: {language == "en" ? crop.planting_time?.en : crop.planting_time?.np}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


function SoilDetailsCard({ soilDetails, language }) {
  if (!soilDetails) return null;
  const fields = [
    { key: "pH", label: "pH" },
    { key: "OrganicMatter", label: language === "np" ? "जैविक पदार्थ" : "Organic Matter" },
    { key: "TotalNitrogen", label: language === "np" ? "नाइट्रोजन" : "Total Nitrogen" },
    { key: "P2O5", label: language === "np" ? "फस्फोरस" : "Phosphorus" },
    { key: "Boron", label: language === "np" ? "बोरोन" : "Boron" },
    { key: "sand/clayPercentage", label: language === "np" ? "बालुवा/माटो %" : "Sand/Clay %" },
  ];

  return (
    <div className="bg-white rounded-xl shadow   p-4 mt-4">
      <h3 className="font-bold text-gray-800 mb-2">
        {language === "en" ? "Soil Details" : "माटो विवरण"}
      </h3>
      <div className="flex flex-col gap-4">
        {fields.map(({ key, label }) => {
          const prop = soilDetails[key];
          if (!prop) return null;
          return (
            <div key={key} className="p-3 rounded-lg  bg-gray-50">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-green-700">{label}:</span>
                <span className="text-gray-800">{prop.value}</span>
              </div>
              <div className="text-sm text-gray-700 mb-1">
                <FaInfoCircle className="inline mr-1 text-blue-400" />
                {prop.interpretation?.[language]}
              </div>
              <div className="flex items-center gap-2 text-xs mb-1">
                <FaCheckCircle className="text-green-500" />
                <span>{prop.safety_check?.[language]}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FaExclamationTriangle className="text-yellow-500" />
                <span>{prop.mitigation?.[language]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FinalConclusionCard({ finalConclusion, language }) {
  if (!finalConclusion) return null;
  return (
    <div className="bg-green-50 border-l-4 border-green-400 rounded-xl p-4 mt-4 shadow">
      <h4 className="font-bold text-green-800 mb-2">
        {language === "en" ? "Summary & Advice" : "सारांश र सुझाव"}
      </h4>
      <p className="text-gray-800">{finalConclusion[language]}</p>
    </div>
  );
}