import React from "react";
import { FaBookOpen, FaUsers, FaUserCircle, FaBook } from 'react-icons/fa';
import { VscGraph } from 'react-icons/vsc';
import { BsGraphUpArrow } from 'react-icons/bs';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom"; 
import { useTextLang } from '../libs/utils';

const Dashboard = () => {
  const headerTitle = useTextLang("Agro Dashboard", "कृषि ड्यासबोर्ड");
  const openText = useTextLang("Open", "खोल्नुहोस्");
  const dashboardCards = [
    { 
      label: useTextLang("Courses", "पाठ्यक्रम"), 
      icon: <FaBookOpen size={36} className="text-emerald-600" />, 
      description: useTextLang(
        "Access agricultural learning materials and structured courses.",
        "कृषिसम्बन्धी अध्ययन सामग्री र संरचित पाठ्यक्रमहरू प्रयोग गर्नुहोस्।"
      ),
      link: "/courses"   
    },
    { 
      label: useTextLang("Regional Crops", "क्षेत्रगत बालीहरू"), 
      icon: <VscGraph size={36} className="text-emerald-600" />, 
      description: useTextLang(
        "Explore data and insights on crops specific to different regions.",
        "विभिन्न प्रदेशका विशिष्ट बालीसम्बन्धी तथ्यांक र अन्तर्दृष्टि हेर्नुहोस्।"
      ),
      link: "/regional-crops"
    },
    { 
      label: useTextLang("Market Trend", "बजार प्रवृत्ति"), 
      icon: <BsGraphUpArrow size={36} className="text-emerald-600" />, 
      description: useTextLang(
        "Track market demand, pricing trends, and forecasts.",
        "बजारको माग, मूल्य प्रवृत्ति र पूर्वानुमान ट्र्याक गर्नुहोस्।"
      ),
      link: "/market"
    },
    { 
      label: useTextLang("Expert Advice", "विशेषज्ञ सल्लाह"), 
      icon: <FaUsers size={36} className="text-emerald-600" />, 
      description: useTextLang(
        "Get guidance and solutions from agricultural experts.",
        "कृषि विशेषज्ञबाट मार्गदर्शन र समाधान प्राप्त गर्नुहोस्।"
      ),
      link: "/community"
    },
    { 
      label: useTextLang("Business Diary", "व्यवसाय डायरी"), 
      icon: <FaBook size={36} className="text-emerald-600" />, 
      description: useTextLang(
        "Maintain daily records of farming activities and expenses.",
        "दैनिक कृषि गतिविधि र खर्च अभिलेख राख्नुहोस्।"
      ),
      link: "/diary"
    },
    { 
      label: useTextLang("User Profile", "प्रयोगकर्ता प्रोफाइल"), 
      icon: <FaUserCircle size={36} className="text-emerald-600" />, 
      description: useTextLang(
        "Manage your account, settings, and personal details.",
        "खाता, सेटिङ्स र व्यक्तिगत विवरण व्यवस्थापन गर्नुहोस्।"
      ),
      link: "/user"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 pb-6 mb-8">
          <h2 className="text-2xl font-semibold text-emerald-700">{headerTitle}</h2>
        </header>

        {/* Main */}
        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="p-6 flex flex-col items-start text-left">
                  <div className="inline-flex items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 p-3">
                    {card.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">{card.label}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                  <Link 
                    to={card.link} 
                    className="mt-5 inline-flex items-center gap-2 text-emerald-700 font-medium hover:text-emerald-800"
                  >
                    <span>{openText}</span>
                    <FaArrowRightLong className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
