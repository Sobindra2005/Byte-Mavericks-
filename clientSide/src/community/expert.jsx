import React, { useState } from "react";
import useStore from "../store";
import { FaStar } from "react-icons/fa";
import User1 from "../assets/user/user1.svg";
import User2 from "../assets/user/user2.svg";
import User3 from "../assets/user/expert-1.jpg";
import User4 from "../assets/user/expert-2.jpg";
import User5 from "../assets/user/expert-3.jpg";
import User6 from "../assets/user/user6.svg";
import { useTextLang } from "../libs/utils";

export default function Expert({ handleSubmit, formData, setFormData }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);
  const toggleModal = () => setModalOpen(!isModalOpen);

  const Datas = [
    {
      id: 1,
      img: User1,
      name: { en: "Ram Prasad", np: "राम प्रसाद" },
      title: { en: "Freelance Farmer", np: "स्वतन्त्र किसान" },
      rating: 4,
      reviews: "2",
    },
    {
      id: 2,
      img: User2,
      name: { en: "Shyam Das", np: "श्याम दास" },
      title: { en: "Urban Gardener", np: "शहरी बगैंचावाला" },
      rating: 3,
      reviews: "1",
    },
    {
      id: 3,
      img: User3,
      name: { en: "Shyam Pokhrel", np: "श्याम पोखरेल" },
      title: { en: "Agro Consultant", np: "कृषि सल्लाहकार" },
      rating: 5,
      reviews: "3",
    },
    {
      id: 4,
      img: User4,
      name: { en: "Binit Khadka", np: "बिनित खड्का" },
      title: { en: "Mushroom Farmer", np: "च्याउ किसान" },
      rating: 5,
      reviews: "3",
    },
    {
      id: 5,
      img: User5,
      name: { en: "Sobindra Budhathoki", np: "सोबिन्द्र बुढाथोकी" },
      title: { en: "Tomato Farmer", np: "टमाटर किसान" },
      rating: 5,
      reviews: "3",
    },
    {
      id: 6,
      img: User6,
      name: { en: "Shreejit Gautam", np: "श्रीजित गौतम" },
      title: { en: "Soil Specialist", np: "माटो विशेषज्ञ" },
      rating: 5,
      reviews: "3",
    },
  ];

  return (
    <div className="container mx-auto px-4 ml-12 py-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
        {Datas.map(({ id, img, name, title, rating, reviews }) => {
          const language = useStore.getState().language;
          return (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center border mb-8 border-green-200 hover:border-green-400"
            >
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-green-200 shadow-md overflow-hidden -mt-16 bg-green-50">
                <img
                  src={img}
                  alt="Expert"
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="text-center mt-6">
                <h2 className="font-semibold text-lg md:text-xl text-green-800">
                  {name[language]}
                </h2>
                <p className="text-green-600 text-sm">{title[language]}</p>
              </div>

              {/* Ratings */}
              <div className="flex items-center justify-center mt-3 space-x-1">
                {Array.from({ length: rating }, (_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-lg" />
                ))}
                <span className="ml-2 text-sm text-green-700">
                  ({reviews} reviews)
                </span>
              </div>

              {/* Action button */}
              <button
                onClick={toggleModal}
                className="mt-5  rounded-2xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all  text-white font-medium py-2 px-4 shadow-lg "
              >
                {useTextLang("Book a Session", "सेसन बुक गर्नुहोस्")}
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-all">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border-t-4 border-green-500 relative animate-fadeIn">
            <form 
  onSubmit={(e) => {
    e.preventDefault(); 
    handleSubmit(e); 
    setFormData({ name: "", email: "", problem: "" });
    setModalOpen(false);
  }}
>  <h3 className="font-bold text-2xl text-center mb-6 text-green-700">
                
                {language === "np"
                  ? "🌱 आफ्नो प्रश्न सोध्नुहोस्"
                  : "🌱 Ask Your Question"}
              </h3>
              <div className="flex flex-col sm:flex-row sm:gap-x-4 mb-4 gap-3">
                <input
                  className="sm:w-full border rounded-md outline-none border-green-300 p-2 text-lg focus:ring-2 focus:ring-green-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={language === "np" ? "आफ्नो नाम" : "Your Name"}
                  type="text"
                  required
                />
                <input
                  className="sm:w-full border rounded-md outline-none border-green-300 p-2 text-lg focus:ring-2 focus:ring-green-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder={language === "np" ? "आफ्नो फोन नम्बर" : "Your Phone Number"}
                  type="number"
                  required
                />
              </div>
              <textarea
                rows="4"
                className="block p-2.5 w-full text-lg rounded-md border border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder={
                  language === "np"
                    ? "तपाईंको प्रश्न के हो?..."
                    : "What is your question?..."
                }
                value={formData.problem}
                onChange={(e) =>
                  setFormData({ ...formData, problem: e.target.value })
                }
                required
              ></textarea>
              {/* Buttons */}
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-green-600 hover:bg-green-700 rounded-full px-6 py-2 shadow-md text-lg font-semibold"
                >
                  {language === "np" ? "पेश गर्नुहोस्" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-700 bg-gray-200 hover:bg-red-500 hover:text-white rounded-full px-6 py-2 text-lg font-semibold"
                >
                  {language === "np" ? "रद्द गर्नुहोस्" : "Cancel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
