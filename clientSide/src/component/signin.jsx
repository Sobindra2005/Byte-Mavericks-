import React from "react";
import Thumbnail from "../assets/hum.jpg";
import { CiMail, CiLock } from "react-icons/ci";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

export default function Signin() {
  return (
    <div
      style={{ backgroundImage: `url(${Thumbnail})` }}
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center"
    >
      <div className="bg-white/30 backdrop-blur-lg border border-green/40 rounded-lg mt-[5rem] p-6 shadow-lg w-full border-green-800 max-w-4xl">
        <h2 className="text-center font-bold text-3xl mb-6 text-green-800">
          Signup
        </h2>

        <form className="flex flex-col space-y-5">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="font-bold">First Name:</label>
              <div className="flex relative">
                <FaUser className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder="Enter your first name..."
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="font-bold">Last Name:</label>
              <div className="flex relative">
                <TbUser className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder="Enter your last name..."
                />
              </div>
            </div>
          </div>

          {/* Email and Gender */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="font-bold">Email:</label>
              <div className="flex relative">
                <CiMail className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder="Enter your email..."
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="font-bold">Gender:</label>
              <select className="w-full p-2 border rounded">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Phone and Role */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="font-bold">Phone Number:</label>
              <div className="flex relative">
                <FaPhoneAlt className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder="Enter your phone number..."
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="font-bold">Role:</label>
              <select className="w-full p-2 border rounded">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Password Fields */}
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label className="font-bold">Password:</label>
              <div className="flex relative">
                <CiLock className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder="Enter your password..."
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="font-bold">Confirm Password:</label>
              <div className="flex relative">
                <CiLock className="absolute text-2xl left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  className="border w-full p-2 pl-10 rounded"
                  placeholder="Confirm your password..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button className="bg-green-700 hover:bg-green-800 text-white p-2 rounded mt-4">
            Submit
          </button>
        </form>

        {/* Bottom Links */}
        <div className="flex flex-col justify-center items-center mt-6 space-y-2">
          <div className="flex space-x-2 items-center">
            <p>Already have an account?</p>
            <Link to="/login" className="text-green-700 font-bold underline">
              Login
            </Link>
          </div>
          <p>Or sign up with:</p>
          <div className="flex space-x-4 text-2xl mt-2">
            <FcGoogle />
            <FaFacebook />
          </div>
        </div>
      </div>
    </div>
  );
}
