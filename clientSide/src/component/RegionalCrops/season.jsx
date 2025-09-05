import React, { useState } from 'react';
import Datas from './Data.js';
import { Link } from 'react-router-dom';
import Barley from '../../assets/crops-image/Barley.jpg';
import Cardamom from '../../assets/crops-image/Cardamom.jpg';
import Corn from '../../assets/crops-image/Corn.jpg';
import Millet from '../../assets/crops-image/Millet.jpg';
import Potato from '../../assets/crops-image/potato.jpg';
import Tea from '../../assets/crops-image/tea.jpg';
import Vegetables from '../../assets/crops-image/vegetables.jpg';
import Wheat from '../../assets/crops-image/wheat.jpg';
import Rice from '../../assets/crops-image/rice.jpg';
import Sugarcane from '../../assets/crops-image/sugarcare.jpg';
import Apple from '../../assets/crops-image/apple.jpg';
import Buckwheat from '../../assets/crops-image/Buckwheat.jpg';
import Citrus from '../../assets/crops-image/Citrus.jpg';
import Mustard from '../../assets/crops-image/mustard.jpg';
import Coffee from '../../assets/crops-image/coffee.jpg';
import Pulse from '../../assets/crops-image/Pulse.jpg';
import Orange from '../../assets/crops-image/orange.jpg';
import Tomato from '../../assets/crops-image/tomato.jpg';
import Cauliflower from '../../assets/crops-image/cauliflower.jpg';

// Create a mapping of crop names to their respective images
const cropImages = {
  "जौ": Barley,
  "इलायची": Cardamom,
  "मकै": Corn,
  "Millet": Millet,
  "आलु": Potato,
  "चिया": Tea,
  "तरकारी": Vegetables,
  "गहुँ": Wheat,
  "धान": Rice,
  "Sugarcane": Sugarcane,
  "Apples": Apple,
  "गहुँ": Buckwheat,
  "Citrus": Citrus,
  "Mustard": Mustard,
  "Coffees": Coffee,
  "Pulses": Pulse,
  "सुन्तला": Orange,
  "टमाटर": Tomato,
  "काउली": Cauliflower,
};

export default function Season() {
  const [selectedProvince, setSelectedProvince] = useState(Datas.provinces[0]);
  const [selectedSeason, setSelectedSeason] = useState(selectedProvince.seasonalCrops[0]);

  const handleProvinceChange = (e) => {
    const province = Datas.provinces.find(p => p.name === e.target.value);
    setSelectedProvince(province);
    setSelectedSeason(province.seasonalCrops[0]);
  };

  const handleSeasonChange = (e) => {
    const season = selectedProvince.seasonalCrops.find(s => s.season === e.target.value);
    setSelectedSeason(season);
  };

  // Helper to generate a dynamic link (replace with your logic)
  const getCropLink = (crop) => {
    // Example: lowercase, replace spaces with dashes
    const slug = crop.toLowerCase().replace(/\s+/g, '-');
    return `/courses/player/${slug}-farming`;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-white min-h-screen py-8 px-2">
      <div className="mx-auto">
        {/* Header Card */}
        <div className="rounded-xl shadow-lg bg-accent text-white p-6 mb-8 flex flex-col sm:flex-row items-center justify-between">
          <div>
            <p className="font-bold text-2xl mb-2">प्रदेश: <span className="font-normal">{selectedProvince.name}</span></p>
            <p className="text-lg">स्थान: <span className="font-normal">काठमाडौं</span></p>
          </div>
          <div className="mt-4 sm:mt-0">
            <label htmlFor="season" className="mr-2 font-semibold">ऋतु:</label>
            <select
              name="season"
              id="season"
              className="border rounded-md p-2 text-black"
              onChange={handleSeasonChange}
              value={selectedSeason.season}
            >
              {selectedProvince.seasonalCrops.map((season) => (
                <option key={season.season} value={season.season}>
                  {season.season}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Crops Grid */}
        <h2 className="text-xl font-bold text-primary mb-4 text-center">
          {selectedSeason.season} मा उपयुक्त बालीहरू
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {selectedSeason.crops.map(crop => (
            <div
              key={crop}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col items-center p-4 border border-gray-100"
            >
              <img
                src={cropImages[crop]}
                alt={crop}
                className="w-40 h-32 object-cover rounded-lg mb-3 border border-green-200"
              />
              <span className="font-bold text-lg text-accent mb-2">{crop}</span>
              <p className="text-gray-700 text-center mb-4">{crop} खेती गर्ने तरिका जान्न तल क्लिक गर्नुहोस्।</p>
              <Link to={getCropLink(cropImages[crop])} className="w-full">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors">
                  थप जानकारी
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}