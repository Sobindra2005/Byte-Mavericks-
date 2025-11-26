import React from "react";
import Thumbnail from "../assets/hum.jpg";
import { CiMail, CiLock } from "react-icons/ci";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { useTextLang } from "../libs/utils";

export default function Signin() {
  return (
    <div
      style={{ backgroundImage: `url(${Thumbnail})` }}
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
    >
      <div className="bg-white/30 backdrop-blur-lg border border-green/40 rounded-lg  p-6 shadow-lg w-full border-green-800 max-w-4xl">
        <h2 className="text-center font-bold text-3xl mb-6 text-green-800">
          {useTextLang("Signup", "साइन अप")}
        </h2>

        <form className="flex flex-col space-y-5">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="font-bold">{useTextLang("First Name:", "पहिलो नाम:")}</label>
              <div className="flex relative">
                <FaUser className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder={useTextLang("Enter your first name...", "आफ्नो पहिलो नाम प्रविष्ट गर्नुहोस्...")}
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="font-bold">{useTextLang("Last Name:", "थर:")}</label>
              <div className="flex relative">
                <TbUser className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder={useTextLang("Enter your last name...", "आफ्नो थर प्रविष्ट गर्नुहोस्...")}
                />
              </div>
            </div>
          </div>

          {/* Email and Gender */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="font-bold">{useTextLang("Email:", "इमेल:")}</label>
              <div className="flex relative">
                <CiMail className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder={useTextLang("Enter your email...", "आफ्नो इमेल प्रविष्ट गर्नुहोस्...")}
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="font-bold">{useTextLang("Gender:", "लिङ्ग:")}</label>
              <select className="w-full p-2 border rounded">
                <option value="male">{useTextLang("Male", "पुरुष")}</option>
                <option value="female">{useTextLang("Female", "महिला")}</option>
                <option value="other">{useTextLang("Other", "अन्य")}</option>
              </select>
            </div>
          </div>

          {/* Phone and Role */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="font-bold">{useTextLang("Phone Number:", "फोन नम्बर:")}</label>
              <div className="flex relative">
                <FaPhoneAlt className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder={useTextLang("Enter your phone number...", "आफ्नो फोन नम्बर प्रविष्ट गर्नुहोस्...")}
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="font-bold">{useTextLang("Role:", "भूमिका:")}</label>
              <select className="w-full p-2 border rounded">
                <option value="user">{useTextLang("User", "प्रयोगकर्ता")}</option>
                <option value="admin">{useTextLang("Admin", "व्यवस्थापक")}</option>
              </select>
            </div>
          </div>

          {/* Password Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="font-bold">{useTextLang("Password:", "पासवर्ड:")}</label>
              <div className="flex relative">
                <CiLock className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder={useTextLang("Enter your password...", "आफ्नो पासवर्ड प्रविष्ट गर्नुहोस्...")}
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="font-bold">{useTextLang("Confirm Password:", "पासवर्ड पुष्टि गर्नुहोस्:")}</label>
              <div className="flex relative">
                <CiLock className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder={useTextLang("Confirm your password...", "आफ्नो पासवर्ड पुष्टि गर्नुहोस्...")}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="bg-green-700 hover:bg-green-800 text-white p-2 rounded mt-4">
            {useTextLang("Submit", "बुझाउनुहोस्")}
          </button>
        </form>

        {/* Bottom Links */}
        <div className="flex flex-col justify-center items-center mt-6 space-y-2">
          <div className="flex space-x-2 items-center">
            <p>{useTextLang("Already have an account?", "पहिले नै खाता छ?")}</p>
            <Link to="/login" className="text-green-700 font-bold underline">
              {useTextLang("Login", "लगइन")}
            </Link>
          </div>
          <p>{useTextLang("Or sign up with:", "वा साइन अप गर्नुहोस्:")}</p>
          <div className="flex space-x-4 text-2xl mt-2">
            <FcGoogle />
            <FaFacebook />
          </div>
        </div>
      </div>
    </div>
  );
}
