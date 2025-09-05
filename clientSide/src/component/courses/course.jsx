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
        className='absolute top-1/2 right-2 -translate-y-1/2 bg-green-700/90 hover:bg-green-700 rounded-full p-2 cursor-pointer shadow-md z-10 transition-colors'
        onClick={onClick}
    >
        <IoIosArrowForward size={20} color='#fff' />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className='absolute top-1/2 left-2 -translate-y-1/2 bg-green-700/90 hover:bg-green-700 rounded-full p-2 cursor-pointer shadow-md z-10 transition-colors'
        onClick={onClick}
    >
        <IoIosArrowBack size={20} color='#fff' />
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
        <div className='max-w-6xl mx-auto px-4 py-6'>
            <h2 className='text-3xl font-bold text-center mb-8 text-green-900'>
                {useTextLang('Agriculture Courses', 'कृषि पाठ्यक्रम')}
            </h2>

            {/* Animal Section */}
            <section className='mb-12 border border-green-100 rounded-xl p-4 bg-white'>
                <h3 className='text-xl ml-2 font-semibold mb-4 text-green-800'>
                    {useTextLang('How to raise livestock?', 'कसरी पशुपालन गर्ने?')}
                </h3>
                <Slider {...settings}>
                    {filteredAnimalData.map((data) => {
                        const { id, title, thumbnail } = data;
                        return (
                            <div key={id} className='p-2'>
                                <Link to={`/courses/player/${id}`} className='block bg-white border border-green-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all'>
                                    <img src={thumbnail} alt={title} className='w-full h-44 object-cover' />
                                    <div className='p-3'>
                                        <h4 className='text-base font-semibold text-gray-800 hover:text-green-700 transition-colors line-clamp-2'>
                                            {language === 'en' ? (data.title_en || title) : title}
                                        </h4>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </Slider>
            </section>

            {/* Plant Section */}
            <section className='border border-green-100 rounded-xl p-4 bg-white'>
                <h3 className='text-xl ml-2 font-semibold mb-4 text-green-800'>
                    {useTextLang('How do plants grow?', 'बिरुवा कसरी बढ्ने?')}
                </h3>
                <Slider {...settings}>
                    {filteredPlantData.map((data) => {
                        const { id, title, thumbnail } = data;
                        return (
                            <div key={id} className='p-2'>
                                <Link to={`/courses/player/${id}`} className='block bg-white border border-green-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all'>
                                    <img src={thumbnail} alt={title} className='w-full h-44 object-cover' />
                                    <div className='p-3'>
                                        <h4 className='text-base font-semibold text-gray-800 hover:text-green-700 transition-colors line-clamp-2'>
                                            {language === 'en' ? (data.title_en || title) : title}
                                        </h4>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </Slider>
            </section>
        </div>
    );
}
