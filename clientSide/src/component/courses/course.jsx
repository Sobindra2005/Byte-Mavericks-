import React, { useState } from 'react';
import Slider from "react-slick";
import Datas from './datas';
import useStore from '../../store';
import { useTextLang } from '../../libs/utils';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-2 -translate-y-1/2 bg-green-600/90 hover:bg-green-700 rounded-full p-2 cursor-pointer shadow-lg z-10 transition-all"
    onClick={onClick}
  >
    <IoIosArrowForward size={20} color="#fff" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-2 -translate-y-1/2 bg-green-600/90 hover:bg-green-700 rounded-full p-2 cursor-pointer shadow-lg z-10 transition-all"
    onClick={onClick}
  >
    <IoIosArrowBack size={20} color="#fff" />
  </div>
);

export default function Course() {
  const language = useStore((state) => state.language);
  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ]
  };

  const [animalType] = useState('animal');
  const filteredAnimalData = Datas.filter(data => data.type === animalType);

  const [plantType] = useState('plant');
  const filteredPlantData = Datas.filter(data => data.type === plantType);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-gradient-to-b from-green-50 to-green-100 rounded-xl shadow-inner">
      <h2 className="text-4xl font-bold text-center mb-10 text-green-800 drop-shadow-sm">
        {useTextLang('🌿 Agriculture Courses', '🌿 कृषि पाठ्यक्रम')}
      </h2>

      {/* Animal Section */}
      <section className="mb-12 border border-green-200 rounded-2xl p-6 bg-white/90 shadow-lg hover:shadow-green-200 transition-shadow">
        <h3 className="text-2xl font-semibold mb-5 text-green-700 border-l-4 border-green-500 pl-3">
          {useTextLang('How to raise livestock?', 'कसरी पशुपालन गर्ने?')}
        </h3>
        <Slider {...settings}>
          {filteredAnimalData.map(({ id, title, thumbnail, title_en }) => (
            <div key={id} className="p-2">
              <Link 
                to={`/courses/player/${id}`} 
                className="block bg-green-50 border border-green-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:border-green-400 hover:-translate-y-1 transition-all"
              >
                <img src={thumbnail} alt={title} className="w-full h-44 object-cover" />
                <div className="p-3">
                  <h4 className="text-base font-semibold text-gray-800 hover:text-green-700 transition-colors line-clamp-2">
                    {language === 'en' ? (title_en || title) : title}
                  </h4>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </section>

      {/* Plant Section */}
      <section className="border border-green-200 rounded-2xl p-6 bg-white/90 shadow-lg hover:shadow-green-200 transition-shadow">
        <h3 className="text-2xl font-semibold mb-5 text-green-700 border-l-4 border-green-500 pl-3">
          {useTextLang('How do plants grow?', 'बिरुवा कसरी बढ्ने?')}
        </h3>
        <Slider {...settings}>
          {filteredPlantData.map(({ id, title, thumbnail, title_en }) => (
            <div key={id} className="p-2">
              <Link 
                to={`/courses/player/${id}`} 
                className="block bg-green-50 border border-green-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:border-green-400 hover:-translate-y-1 transition-all"
              >
                <img src={thumbnail} alt={title} className="w-full h-44 object-cover" />
                <div className="p-3">
                  <h4 className="text-base font-semibold text-gray-800 hover:text-green-700 transition-colors line-clamp-2">
                    {language === 'en' ? (title_en || title) : title}
                  </h4>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
