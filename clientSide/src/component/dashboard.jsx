import React from "react";
import { FaBookOpen, FaUsers, FaUserCircle, FaBook } from 'react-icons/fa';
import { VscGraph } from 'react-icons/vsc';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom"; 

const Dashboard = () => {
  const dashboardCards = [
    { 
      label: "Courses", 
      icon: <FaBookOpen size={48} className="text-green-700" />, 
      description: "Access agricultural learning materials and structured courses.",
      link: "/courses"   
    },
    { 
      label: "Regional Crops", 
      icon: <VscGraph size={48} className="text-green-500" />, 
      description: "Explore data and insights on crops specific to different regions.",
      link: "/regional-crops"
    },
    { 
      label: "Market Trend", 
      icon: <BsGraphUpArrow size={48} className="text-yellow-600" />, 
      description: "Track market demand, pricing trends, and forecasts.",
      link: "/market"
    },
    { 
      label: "Expert Advice", 
      icon: <FaUsers size={48} className="text-orange-600" />, 
      description: "Get guidance and solutions from agricultural experts.",
      link: "/community"
    },
    { 
      label: "Business Diary", 
      icon: <FaBook size={48} className="text-purple-700" />, 
      description: "Maintain daily records of farming activities and expenses.",
      link: "/diary"
    },
    { 
      label: "User Profile", 
      icon: <FaUserCircle size={48} className="text-gray-700" />, 
      description: "Manage your account, settings, and personal details.",
      link: "/user"
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-green-600 to-green-400 shadow p-4 flex justify-between items-center text-white">
          <h2 className="text-xl ml-10 font-semibold">🌿 Agro Dashboard</h2>
                  </header>

        {/* Main */}
        <main className="flex-1 p-6 bg-gradient-to-br from-green-50 to-green-100 ml-10">
          <div className="grid grid-cols-1 md:grid-cols-3 h-150 gap-6">
            {dashboardCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition transform duration-300 flex flex-col items-center justify-center text-center border border-green-100"
              >
                {card.icon}
                <h3 className="mt-3 font-semibold text-3xl text-green-700">{card.label}</h3>
                <p className="mt-2 text-[1rem] font-semibold text-gray-600">{card.description}</p>
                
               
                <Link 
                  to={card.link} 
                  className="flex items-center gap-2 mt-4 font-medium cursor-pointer hover:underline"
                >
                  <FaArrowLeftLong />
                  <span>Go to</span>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
