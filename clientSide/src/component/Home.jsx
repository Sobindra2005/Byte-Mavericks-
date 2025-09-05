import React from "react";
import Main from "../assets/main.png";
import { Link } from "react-router-dom";
import { useTextLang } from "../libs/utils";

const Home = () => {
  return (
    <div className="w-full">
      {/* 🌱 Hero Section */}
      <div
        className="relative w-full h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${Main})` }}
      >
        <div className="absolute inset-0"></div>

        <div className="absolute  inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <p className="mt-4 italic text-lg md:text-2xl">
            {useTextLang(
              "Today's farming, tomorrow's prosperity !",
              "आजको खेती, भोलिको भविष्य ! "
            )}
          </p>
          <h1 className="text-4xl mt-2 font-bold drop-shadow-lg">
            {useTextLang("Are you interested in agriculture ?", "के तपाईं कृषि मा रुचि राख्नुहुन्छ ?")}
          </h1>
          

          <div className="mt-8 flex space-x-4">
            <Link to="/courses">
              <button className="h-12 w-32 bg-[#FFD317] rounded-2xl text-black font-semibold shadow-md hover:bg-amber-400 transition">
                {useTextLang("Courses", "पाठ्यक्रम")}
              </button>
            </Link>

            <Link to="/login">
              <button className="h-12 w-32 bg-[#62CD14] rounded-2xl text-white font-semibold shadow-md hover:bg-green-600 transition">
                {useTextLang("Login", "लगइन")}
              </button>
            </Link>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default Home;
