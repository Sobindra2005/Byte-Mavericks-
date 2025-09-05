import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import User1 from '../assets/user/user1.svg';
import User2 from '../assets/user/user2.svg';
import User3 from '../assets/user/user3.svg';
import User4 from '../assets/user/user4.svg';
import User5 from '../assets/user/user5.svg';
import User6 from '../assets/user/user6.svg';

export default function Expert({ handleSubmit, formData, setFormData }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const Datas = [
    { id: 1, img: User1, name: "Ram Prasad", title: "Freelance Farmer", rating: 4, reviews: "2" },
    { id: 2, img: User2, name: "Shyam Das", title: "Urban Gardener", rating: 3, reviews: "1" },
    { id: 3, img: User3, name: "Shyam Pokhrel", title: "Agro Consultant", rating: 5, reviews: "3" },
    { id: 4, img: User4, name: "Binit Khadka", title: "Mushroom Farmer", rating: 5, reviews: "3" },
    { id: 5, img: User5, name: "Sobindra Budhathoki", title: "Tomato Farmer", rating: 5, reviews: "3" },
    { id: 6, img: User6, name: "Shreejit Gautam", title: "Soil Specialist", rating: 5, reviews: "3" },
  ];

  return (
    <div className="container mx-auto px-4 ml-12 py-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-12 text-green-700">
        🌿 हाम्रो विशेषज्ञहरु
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-8">
        {Datas.map(({ id, img, name, title, rating, reviews }) => (
          <div
            key={id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center border mb-8 border-green-200 hover:border-green-400"
          >
            {/* Profile image */}
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-green-200 shadow-md overflow-hidden -mt-16 bg-green-50">
              <img src={img} alt="Expert" className="object-cover w-full h-full" />
            </div>

            {/* Name + Title */}
            <div className="text-center mt-6">
              <h2 className="font-semibold text-lg md:text-xl text-green-800">{name}</h2>
              <p className="text-green-600 text-sm">{title}</p>
            </div>

            {/* Ratings */}
            <div className="flex items-center justify-center mt-3 space-x-1">
              {Array.from({ length: rating }, (_, i) => (
                <FaStar key={i} className="text-yellow-500 text-lg" />
              ))}
              <span className="ml-2 text-sm text-green-700">({reviews} reviews)</span>
            </div>

            {/* Action button */}
            <button
              onClick={toggleModal}
              className="mt-5 w-2/3 md:w-1/2 rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all text-white font-medium py-2 px-4 shadow-lg"
            >
              सन्देश पठाउनुहोस्
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl border-t-4 border-green-500">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3 className="font-bold text-xl text-center mb-4 text-green-700">
                🌱 आफ्नो प्रश्न सोध्नुहोस्
              </h3>
              <div className="flex flex-col sm:flex-row sm:gap-x-4 mb-3 gap-3">
                <input
                  className="sm:w-full border rounded-md outline-none border-green-300 p-2 text-lg focus:ring-2 focus:ring-green-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="आफ्नो नाम"
                  type="text"
                  required
                />
                <input
                  className="sm:w-full border rounded-md outline-none border-green-300 p-2 text-lg focus:ring-2 focus:ring-green-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="आफ्नो ईमेल"
                  type="email"
                  required
                />
              </div>
              <textarea
                rows="4"
                className="block p-2.5 w-full text-lg rounded-md border border-green-300 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="तपाईंको प्रश्न के हो?..."
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                required
              ></textarea>

              {/* Buttons */}
              <div className="mt-5 flex justify-center space-x-4">
                <button
                  type="submit"
                  className="text-white bg-green-600 hover:bg-green-700 rounded-md px-5 py-2 shadow-md"
                >
                  पेश गर्नुहोस्
                </button>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-700 bg-gray-200 hover:bg-red-500 hover:text-white rounded-md px-5 py-2"
                >
                  रद्द गर्नुहोस्
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
