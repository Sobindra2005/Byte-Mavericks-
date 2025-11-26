import React from "react";
import RetailerCard from "./RetailerCard";
import { useState } from "react";
import { useTextLang } from "../libs/utils";

const rtls = [
  {
    id: 1,
    name: "FreshMart Wholesalers",
    type: "Grocery & Wholesale",
    location: "Kathmandu",
    contact: "freshmart@gmail.com",
    phone: "9800000001",
    image: "https://source.unsplash.com/400x300/?grocery,store"
  },
  {
    id: 2,
    name: "Organic Bazaar",
    type: "Organic Food Retailer",
    location: "Pokhara",
    contact: "organicbazaar@gmail.com",
    phone: "9800000002",
    image: "https://source.unsplash.com/400x300/?organic,market"
  },
  {
    id: 3,
    name: "AgroTrade Nepal",
    type: "Export & Wholesale",
    location: "Biratnagar",
    contact: "agrotrade@gmail.com",
    phone: "9800000003",
    image: "https://source.unsplash.com/400x300/?warehouse,trade"
  },
  {
    id: 4,
    name: "Krishi Nepal",
    type: "Export & Wholesale",
    location: "Bardibas",
    contact: "krishi1@gmail.com",
    phone: "9800000004",
    image: "https://source.unsplash.com/400x300/?warehouse,trade"
  },
  {
    id: 5,
    name: "Sovit Kumar Shrestha",
    type: "Grocery and Vegetables",
    location: "Jhapa",
    contact: "sovit22@gmail.com",
    phone: "9800000005",
    image: "https://source.unsplash.com/400x300/?warehouse,trade"
  },
  {
    id: 6,
    name: "Saksham Phuyal",
    type: "Mini Market",
    location: "Sundarijal",
    contact: "agrotrade@gmail.com",
    phone: "9800000003",
    image: "https://source.unsplash.com/400x300/?warehouse,trade"
  },
];

export default function Marketplace() {
  const [retailers, setRetailers] = useState(rtls)
  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">AgroConnect</h1>
        <div className="space-x-6">
          {/* <button className="hover:text-yellow-300">Marketplace</button>
          <button className="hover:text-yellow-300">Farmers</button>
          <button className="hover:text-yellow-300">Retailers</button>
          <button className="bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-500">
            Login
          </button> */}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-green-600 text-white py-12 text-center">
        <h2 className="text-4xl font-bold">{useTextLang("Connect with Retailers", "खुद्रा विक्रेताहरूसँग जोड्नुहोस्")}</h2>
        <p className="mt-2 text-lg">
          {useTextLang("Farmers can directly reach retailers & build partnerships", "किसानहरूले सिधै खुद्रा विक्रेताहरूसम्म पुग्न र साझेदारी निर्माण गर्न सक्छन्")}
        </p>
      </header>

      {/* Retailer Cards */}
      <main className="p-8">
        <h3 className="text-2xl font-semibold text-green-700 mb-6">
          {useTextLang("Available Retailers", "उपलब्ध खुद्रा विक्रेताहरू")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {retailers.map((retailer) => (
            <RetailerCard key={retailer.id} retailer={retailer} />
          ))}
        </div>
      </main>
    </div>
  );
}
