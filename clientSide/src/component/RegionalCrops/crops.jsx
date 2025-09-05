import React from 'react';
import Season from './season';

const explanations = {
  parentsoil: "Type of soil found in your field. Different crops grow better in different soils.",
  ph: "Shows if your soil is acidic or alkaline. Most crops prefer pH between 6 and 7.",
  clay: "Amount of clay in soil. More clay means soil holds water longer.",
  organicMatter: "Shows how much plant/animal material is in soil. More is better for crops.",
  totalNitrogen: "Nitrogen helps plants grow leaves and stems.",
  boron: "A nutrient plants need in small amounts for healthy growth.",
  p2o5: "Phosphorus helps roots grow strong.",
  sand: "Amount of sand in soil. More sand means soil drains water quickly.",
};

const friendlyLabels = {
  parentsoil: "Soil Type",
  ph: "Soil pH",
  clay: "Clay Content",
  organicMatter: "Organic Matter",
  totalNitrogen: "Nitrogen",
  boron: "Boron",
  p2o5: "Phosphorus (P₂O₅)",
  sand: "Sand Content",
};

export default function Crops() {
  let datas = [{
    "coord": { "lon": 85.332, "lat": 27.697 },
    "parentsoil": "Fluvial non calcareous",
    "ph": 6.32,
    "clay": "19.22 %",
    "organicMatter": "2.47 %",
    "totalNitrogen": "0.13 %",
    "boron": "1.07 ppm",
    "p2o5": "428.57 kg/ha",
    "sand": "49.69 %"
  }];

  return (
    <>
      <div className="flex justify-center">
        <div className="border border-accent m-4 p-6 rounded-lg shadow-lg bg-white w-full">
          <h2 className="font-bold text-lg mb-4 text-accent">Your Soil Report</h2>
          <p className="mb-4 text-gray-700">
            Understanding your soil helps you choose the best crops and improve your harvest. Here’s what your soil test means:
          </p>
          <div className="grid grid-cols-1 gap-4">
            {datas.map((data, index) => (
              <div key={index}>
                <div className="mb-2">
                  <span className="font-semibold text-accent">Location:</span>
                  <span className="ml-2 text-gray-800">Lat {data.coord.lat}</span>
                </div>
                {Object.keys(friendlyLabels).map((key) => (
                  <div key={key} className="mb-3 p-2 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <span className="font-semibold">{friendlyLabels[key]}:</span>
                      <span className="ml-2 text-gray-800">{data[key]}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{explanations[key]}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400 rounded">
            <p className="font-semibold text-green-700 mb-1">Tip:</p>
            <p className="text-green-800 text-sm">
              For best results, match your crops to your soil type and pH. Add compost to increase organic matter and nutrients.
            </p>
          </div>
        </div>
      </div>
      <Season />
    </>
  );
}