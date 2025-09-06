import { useState, useEffect } from "react";
import useStore from "../store";

const DiseaseDetection = () => {
  const language = useStore((state) => state.language);
  const detectionResult = useStore((state) => state.detectionResult);

  console.log("Detection Result from Store:", detectionResult);
  if (!detectionResult) {
    return (
      <div className="w-full mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg mb-4">
            No detection results available
          </div>
          <div className="text-gray-400 text-sm">
            Please scan an image first using the camera scanner
          </div>
        </div>
      </div>
    );
  }

  const response = detectionResult;
  const info = language === "np" ? response.nepali : response.english;

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-bold text-green-700 shadow">
          {response?.crop === "Corn" ? "🌽" : "🌾"}
        </div>
        <div>
          <div className="text-xl font-bold text-green-800">
            {response.crop || "Unknown Crop"}
          </div>
          <div className="text-sm text-gray-500">
            {response.message || "Analysis completed"}
          </div>
        </div>
      </div>

      {response.ai?.flag ? (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 font-semibold text-center mb-4">
          {language === "np" ? "कुनै रोग पत्ता लागेन!" : "No disease detected!"}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-red-700">
              {language === "np" ? "रोग:" : "Disease:"}
            </span>
            <span className="text-lg font-bold">{response.disease}</span>
            <span className="ml-auto text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
              {language === "np" ? "विश्वसनीयता:" : "Confidence:"}{" "}
              {response.confidence}
            </span>
          </div>

          {info?.description && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
              <span className="font-semibold block mb-1">
                {language === "np" ? "विवरण:" : "Description:"}
              </span>
              <span className="text-gray-800">{info.description}</span>
            </div>
          )}

          {info?.symptoms && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
              <span className="font-semibold block mb-1">
                {language === "np" ? "लक्षणहरू:" : "Symptoms:"}
              </span>
              <ul className="list-disc ml-6 text-gray-800">
                {info.symptoms.map((symptom, i) => (
                  <li key={i}>{symptom}</li>
                ))}
              </ul>
            </div>
          )}

          {info?.remedies && (
            <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
              <span className="font-semibold block mb-1">
                {language === "np" ? "उपचारहरू:" : "Remedies:"}
              </span>
              <ul className="list-disc ml-6 text-gray-800">
                {info.remedies.map((remedy, i) => (
                  <li key={i}>{remedy}</li>
                ))}
              </ul>
            </div>
          )}

          {info?.prevention && (
            <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded">
              <span className="font-semibold block mb-1">
                {language === "np" ? "रोकथाम:" : "Prevention:"}
              </span>
              <ul className="list-disc ml-6 text-gray-800">
                {info.prevention.map((prevention, i) => (
                  <li key={i}>{prevention}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;