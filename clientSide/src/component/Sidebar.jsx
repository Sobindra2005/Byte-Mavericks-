import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { 
  HiOutlineBookOpen,
  HiOutlineClipboardDocumentList,
  HiOutlineGlobeAlt,
  HiOutlineChartBar,
  HiOutlineUsers,
  HiOutlineUserCircle
} from "react-icons/hi2";
import useStore from "../store";

const menuItems = [
  { to: "/courses", icon: <HiOutlineBookOpen size={20} />, en: "Course", np: "पाठ्यक्रम" },
  { to: "/diary", icon: <HiOutlineClipboardDocumentList size={20} />, en: "Business Diary", np: "व्यवसाय डायरी" },
  { to: "/regional-crops", icon: <HiOutlineGlobeAlt size={20} />, en: "Regional Crops", np: "क्षेत्रीय बाली" },
  { to: "/market", icon: <HiOutlineChartBar size={20} />, en: "Market Trend", np: "बजार प्रवृत्ति" },
  { to: "/community", icon: <HiOutlineUsers size={20} />, en: "Expert Advice", np: "विशेषज्ञ सल्लाह" },
  { to: "/user", icon: <HiOutlineUserCircle size={20} />, en: "User Profile", np: "प्रयोगकर्ता प्रोफाइल" },
];

export default function Sidebar() {
  const sidebarOpen = useStore((state) => state.sidebarOpen);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const language = useStore((state) => state.language);
  const location = useLocation();

  return (
    <div
      className={`bg-white/90 backdrop-blur p-3 transition-all duration-300 ease-in-out flex flex-col shadow-md border border-gray-200 rounded-2xl h-full
      ${sidebarOpen ? "w-56" : "w-16"}
      `}
    >
      <div className="flex-col items-center justify-center mb-6">
        <button
          onClick={toggleSidebar}
          className="hidden md:block ml-1 focus:outline-none text-gray-700 hover:text-emerald-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Menu */}
      <ul className={`space-y-2 font-medium`}>
        {menuItems.map((item, idx) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <li key={idx}>
              <Link
                to={item.to}
                title={language === 'en' ? item.en : item.np}
                className={`group flex items-center rounded-xl px-3 py-2 transition-all duration-300 ease-out 
                    ${sidebarOpen ? "text-sm" : "  text-base"}
                    ${isActive ? "bg-emerald-100 text-emerald-800" : "text-gray-700 hover:text-emerald-700 hover:bg-emerald-50"}
                  `}
              >
                <span className={`mr-3 text-xl transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-emerald-700" : ""}`}>{item.icon}</span>
                {sidebarOpen && <span className={`truncate ${isActive ? "font-semibold" : ""}`}>{language === 'en' ? item.en : item.np}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
