import React from "react";
import useStore from "../../store";
import { Link } from "react-router-dom";
import cauliflower from "../../assets/data/cauliflower.json";

export default function HowToPlant() {
  const language = useStore((state) => state.language);
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          {language === "en"
            ? "How to Plant Cauliflower"
            : "फूलगोभी कसरी रोप्ने?"}
        </h1>
        {cauliflower.map((section) => (
          <div key={section.section} className="mb-10">
            <h2 className="text-2xl font-semibold text-green-700 mb-4 mt-6">
              {section.section}
            </h2>
            {section.steps.map((step, idx) => (
              <div
                key={step.title + idx}
                className="flex flex-col md:flex-row items-center gap-6 mb-6 bg-green-50 rounded-xl p-4 shadow"
              >
                <div>
                  <h3 className="font-bold text-lg text-green-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-800 text-base mb-1">
                    {step.desc && typeof step.desc === "object"
                      ? step.desc[language] || step.desc.en
                      : step.desc}
                  </p>
                  {step.detail && (
                    <p className="text-gray-600 text-sm">
                      {typeof step.detail === "object"
                        ? step.detail[language] || step.detail.en
                        : step.detail}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center mt-8">
          <Link
            to="/courses"
            className="px-6 py-2 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 transition-all"
          >
            {language === "en" ? "Back to Courses" : "पाठ्यक्रममा फर्कनुहोस्"}
          </Link>
        </div>
      </div>
    </div>
  );
}
