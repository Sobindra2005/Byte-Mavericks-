import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import useStore from "../../store";

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
  const [fetchCrops, setFetchCrops] = useState({
    "location": "Galkopakha, Kathmandu-16, Kathmandu Metropolitan City, Kathmandu, Bagamati Province, Nepal",
    "recommended_agri_business": [
        {
            "type": "Vegetable",
            "name": "Tomato (गोलभेडा)",
            "suitability": {
                "en": "Highly Suitable",
                "np": "धेरै उपयुक्त"
            },
            "season": {
                "en": "Spring-Summer, Autumn-Winter",
                "np": "वसन्त-गर्मी, शरद-जाडो"
            },
            "rainfall": {
                "en": "600-800 mm",
                "np": "६००-८०० मिमी"
            },
            "temperature": {
                "en": "21-24°C",
                "np": "२१-२४ डिग्री सेल्सियस"
            },
            "productivity": {
                "en": "25-30 tons/hectare",
                "np": "२५-३० टन/हेक्टर"
            },
            "planting_time": {
                "en": "February-March, August-September",
                "np": "फेब्रुअरी-मार्च, अगस्ट-सेप्टेम्बर"
            }
        },
        {
            "type": "Vegetable",
            "name": "Cauliflower (काउली)",
            "suitability": {
                "en": "Suitable",
                "np": "उपयुक्त"
            },
            "season": {
                "en": "Autumn-Winter",
                "np": "शरद-जाडो"
            },
            "rainfall": {
                "en": "600-700 mm",
                "np": "६००-७०० मिमी"
            },
            "temperature": {
                "en": "15-20°C",
                "np": "१५-२० डिग्री सेल्सियस"
            },
            "productivity": {
                "en": "15-20 tons/hectare",
                "np": "१५-२० टन/हेक्टर"
            },
            "planting_time": {
                "en": "September-October",
                "np": "सेप्टेम्बर-अक्टोबर"
            }
        },
        {
            "type": "Fruit",
            "name": "Mandarin Orange (सुन्तला)",
            "suitability": {
                "en": "Moderately Suitable",
                "np": "मध्यम उपयुक्त"
            },
            "season": {
                "en": "Year-round (harvest in winter)",
                "np": "वर्षभरि (जाडोमा फसल)"
            },
            "rainfall": {
                "en": "1000-1500 mm",
                "np": "१०००-१५०० मिमी"
            },
            "temperature": {
                "en": "20-30°C",
                "np": "२०-३० डिग्री सेल्सियस"
            },
            "productivity": {
                "en": "10-15 tons/hectare",
                "np": "१०-१५ टन/हेक्टर"
            },
            "planting_time": {
                "en": "June-July",
                "np": "जुन-जुलाई"
            }
        },
        {
            "type": "Crop",
            "name": "Rice (धान)",
            "suitability": {
                "en": "Suitable",
                "np": "उपयुक्त"
            },
            "season": {
                "en": "Summer",
                "np": "गर्मी"
            },
            "rainfall": {
                "en": "1200-1500 mm",
                "np": "१२००-१५०० मिमी"
            },
            "temperature": {
                "en": "20-35°C",
                "np": "२०-३५ डिग्री सेल्सियस"
            },
            "productivity": {
                "en": "3-4 tons/hectare",
                "np": "३-४ टन/हेक्टर"
            },
            "planting_time": {
                "en": "June-July",
                "np": "जुन-जुलाई"
            }
        },
        {
            "type": "Livestock",
            "name": "Goat Farming (बाख्रा पालन)",
            "suitability": {
                "en": "Highly Suitable",
                "np": "धेरै उपयुक्त"
            },
            "season": {
                "en": "Year-round",
                "np": "वर्षभरि"
            },
            "rainfall": {
                "en": "N/A",
                "np": " N/A"
            },
            "temperature": {
                "en": "5-35°C",
                "np": "५-३५ डिग्री सेल्सियस"
            },
            "productivity": {
                "en": "Variable based on breed and management",
                "np": "नस्ल र व्यवस्थापनको आधारमा परिवर्तनशील"
            },
            "planting_time": {
                "en": "N/A",
                "np": " N/A"
            }
        }
    ],
    "soil_details": {
        "pH": {
            "value": "5.5-7.0",
            "interpretation": {
                "en": "Slightly acidic to neutral. Safe range for most crops and vegetables. Monitor and adjust if necessary.",
                "np": "अलिकति अम्लीय देखि तटस्थ। धेरै बाली र तरकारीहरूको लागि सुरक्षित दायरा। आवश्यक भएमा निगरानी र समायोजन गर्नुहोस्।"
            },
            "safety_check": {
                "en": "Within the acceptable range for most common crops. Regular soil testing is recommended to ensure optimal levels.",
                "np": "धेरै सामान्य बालीहरूको लागि स्वीकार्य दायरा भित्र। इष्टतम स्तरहरू सुनिश्चित गर्न नियमित माटो परीक्षण सिफारिस गरिन्छ।"
            },
            "mitigation": {
                "en": "If pH is too low (acidic), apply lime. If too high (alkaline) apply sulfur or organic matter.",
                "np": "यदि pH धेरै कम (अम्लीय) छ भने, चुना प्रयोग गर्नुहोस्। यदि धेरै उच्च (क्षारीय) छ भने सल्फर वा जैविक पदार्थ प्रयोग गर्नुहोस्।"
            }
        },
        "OrganicMatter": {
            "value": "1-3%",
            "interpretation": {
                "en": "Low to Moderate. Organic matter is crucial for soil fertility, water retention, and nutrient availability.",
                "np": "कम देखि मध्यम। जैविक पदार्थ माटोको उर्वरता, पानी अवधारण, र पोषक तत्व उपलब्धताको लागि महत्वपूर्ण छ।"
            },
            "safety_check": {
                "en": "Below optimal levels for high productivity. Should be increased to at least 3% for best results.",
                "np": "उच्च उत्पादकताको लागि इष्टतम स्तर भन्दा तल। उत्तम परिणामको लागि कम्तिमा 3% सम्म बढाउनुपर्छ।"
            },
            "mitigation": {
                "en": "Incorporate compost, manure, or green manure crops to increase organic matter content.",
                "np": "जैविक पदार्थ सामग्री बढाउन कम्पोस्ट, मल, वा हरियो मल बालीहरू समावेश गर्नुहोस्।"
            }
        },
        "TotalNitrogen": {
            "value": "0.05-0.15%",
            "interpretation": {
                "en": "Low to Moderate. Nitrogen is essential for plant growth, especially leaf development.",
                "np": "कम देखि मध्यम। नाइट्रोजन बिरुवाको वृद्धिको लागि आवश्यक छ, विशेष गरी पात विकासको लागि।"
            },
            "safety_check": {
                "en": "May require supplementation with nitrogen fertilizers, especially for leafy vegetables and cereals.",
                "np": "पातदार तरकारी र अन्न बालीहरूको लागि नाइट्रोजन मलको साथ पूरक आवश्यक हुन सक्छ।"
            },
            "mitigation": {
                "en": "Use nitrogen-fixing cover crops (legumes) or apply nitrogen fertilizers (urea, ammonium sulfate) judiciously.",
                "np": "नाइट्रोजन फिक्सिंग कभर बालीहरू (सिमी) प्रयोग गर्नुहोस् वा नाइट्रोजन मलहरू (यूरिया, अमोनियम सल्फेट) सावधानीपूर्वक प्रयोग गर्नुहोस्।"
            }
        },
        "P2O5": {
            "value": "10-20 ppm",
            "interpretation": {
                "en": "Low to Moderate. Phosphorus is important for root development, flowering, and fruit set.",
                "np": "कम देखि मध्यम। फस्फोरस जराको विकास, फूल फुल्ने, र फल लाग्नको लागि महत्त्वपूर्ण छ।"
            },
            "safety_check": {
                "en": "May require phosphorus fertilizer application, especially for root crops and fruits.",
                "np": "फस्फोरस मलको प्रयोग आवश्यक हुन सक्छ, विशेष गरी जरा बाली र फलहरूको लागि।"
            },
            "mitigation": {
                "en": "Apply phosphorus fertilizers (DAP, SSP) based on soil test recommendations.",
                "np": "माटो परीक्षण सिफारिसको आधारमा फस्फोरस मलहरू (डीएपी, एसएसपी) प्रयोग गर्नुहोस्।"
            }
        },
        "Boron": {
            "value": "<1 ppm",
            "interpretation": {
                "en": "Low. Boron is a micronutrient essential for cell wall development and sugar transport.",
                "np": "कम। बोरोन कोशिका पर्खाल विकास र चिनी ढुवानीको लागि आवश्यक सूक्ष्म पोषक तत्व हो।"
            },
            "safety_check": {
                "en": "Boron deficiency is possible. Soil test is recommended to ensure safe amount.",
                "np": "बोरोनको कमी हुन सक्छ। सुरक्षित मात्रा सुनिश्चित गर्न माटो परीक्षण सिफारिस गरिन्छ।"
            },
            "mitigation": {
                "en": "Apply borax or other boron-containing fertilizers at recommended rates.",
                "np": "सिफारिस गरिएको दरमा बोराक्स वा अन्य बोरोन युक्त मलहरू प्रयोग गर्नुहोस्।"
            }
        },
        "sand/clayPercentage": {
            "value": "Sandy Loam",
            "interpretation": {
                "en": "Well-drained soil, good aeration, but may have lower water and nutrient retention. Mix of sand, silt and clay",
                "np": "राम्रो निकास भएको माटो, राम्रो हावा आवतजावत, तर कम पानी र पोषक तत्व अवधारण हुन सक्छ। बालुवा, सिल्ट र माटोको मिश्रण।"
            },
            "safety_check": {
                "en": "Generally favorable for a wide range of crops. Manage water and nutrient availability carefully.",
                "np": "सामान्यतया धेरै बालीहरूको लागि अनुकूल। पानी र पोषक तत्व उपलब्धता सावधानीपूर्वक व्यवस्थापन गर्नुहोस्।"
            },
            "mitigation": {
                "en": "Add organic matter to improve water and nutrient retention. Consider irrigation during dry periods.",
                "np": "पानी र पोषक तत्व अवधारण सुधार गर्न जैविक पदार्थ थप्नुहोस्। सुख्खा अवधिमा सिंचाई विचार गर्नुहोस्।"
            }
        }
    },
    "final_conclusion": {
        "en": "Galkopakha, Kathmandu, has a climate and soil suitable for a variety of crops, vegetables, fruits and livestock. Focus on soil improvement (organic matter) and proper nutrient management for optimal yields. Consider water management practices, especially during dry seasons. Goat farming is a viable option due to the diverse vegetation and terrain.",
        "np": "गाल्कोपाखा, काठमाडौंमा विभिन्न बाली, तरकारी, फलफूल र पशुपालनका लागि उपयुक्त हावापानी र माटो छ। इष्टतम उपजका लागि माटो सुधार (जैविक पदार्थ) र उचित पोषक तत्व व्यवस्थापनमा ध्यान दिनुहोस्। पानी व्यवस्थापन अभ्यासहरू विचार गर्नुहोस्, विशेष गरी सुख्खा मौसममा। बाख्रा पालन विविध वनस्पति र भूभागका कारण एक व्यवहार्य विकल्प हो।"
    }
});
  const [loading, setLoading] = useState(false);

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
                fetchDataOnMarkerChange={fetchDataOnMarkerChange}
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
        {loading && (
          <div className="flex flex-col items-center justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-green-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span className="text-green-700 font-semibold">Loading soil Data...</span>
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
              {markerDetails?.details?.name || "काठमाडौँ"} को लागि बाली सुझावहरू
            </h2>
          </div>
          <p className="text-gray-600 mb-4 text-sm">
            स्थानीय मौसम र माटोको अवस्था अनुसार सिफारिस गरिएका बालीहरू
          </p>
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <svg className="animate-spin h-8 w-8 text-green-500 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <span className="text-green-700 font-semibold">Loading crop suggestions...</span>
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
                <span className="text-gray-500 font-semibold text-lg">No crop suggestions found for this location.</span>
              </div>
            )}

            {/* Crop Suggestions */}
            {!loading && fetchCrops?.recommended_agri_business && fetchCrops.recommended_agri_business.length > 0 && (
              <div onClick={handleClickOnCrop} className="sticky top-0 flex flex-col gap-4 cursor-pointer">
                {fetchCrops.recommended_agri_business.map((crop, idx) => {
                  return (
                    <div key={idx} className="bg-gray-50 rounded-xl border-l-4 border-green-400 p-4 shadow-sm">
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