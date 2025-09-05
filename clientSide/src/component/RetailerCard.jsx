import React from "react";
import { FaPhoneAlt, FaEnvelope, FaStore } from "react-icons/fa";

export default function RetailerCard({ retailer }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-4 flex flex-col">
      {/* Image
      <div className="h-40 w-full bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={retailer.image}
          alt={retailer.name}
          className="object-cover w-full h-full"
        />
      </div> */}

      {/* Details */}
      <div className="mt-3 flex-1">
        <h3 className="text-lg font-semibold text-green-800 flex items-center">
          <FaStore className="mr-2 text-green-600" /> {retailer.name}
        </h3>
        <p className="text-sm text-gray-500">{retailer.type}</p>
        <p className="text-sm text-gray-600 mt-1">📍 {retailer.location}</p>

        <div className="mt-2 space-y-1 text-sm text-gray-700">
          <p className="flex items-center">
            <FaEnvelope className="mr-2 text-green-500" /> {retailer.contact}
          </p>
          <p className="flex items-center">
            <FaPhoneAlt className="mr-2 text-green-500" /> {retailer.phone}
          </p>
        </div>
      </div>

      {/* Connect Button */}
      <button className="mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Connect with Retailer
      </button>
    </div>
  );
}
