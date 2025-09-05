import React, { useState } from 'react';
import Slider from "react-slick";
import Datas from './datas';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// Custom Next Arrow Component
const NextArrow = ({ onClick }) => (
    <div 
        className='absolute top-1/2 right-0 transform -translate-y-1/2 bg-green-700 rounded-full p-2 cursor-pointer shadow-lg z-10 hover:bg-green-800'
        onClick={onClick}
    >
        <IoIosArrowForward size={24} color='#fff' />
    </div>
);

// Custom Previous Arrow Component
const PrevArrow = ({ onClick }) => (
    <div 
        className='absolute top-1/2 left-0 transform -translate-y-1/2 bg-green-700 rounded-full p-2 cursor-pointer shadow-lg z-10 hover:bg-green-800'
        onClick={onClick}
    >
        <IoIosArrowBack size={24} color='#fff' />
    </div>
);

export default function Course() {
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
        <div className='m-6'>
            <h2 className='text-4xl font-bold text-center mb-10 text-green-900'>🌾 Agriculture Courses 🌿</h2>

            {/* Animal Section */}
            <section className='mb-12 bg-green-50 p-6 rounded-lg shadow-inner'>
                <h3 className='text-2xl ml-6 font-semibold mb-6 text-green-800'>🐄 कसरी पशुपालन गर्ने ?</h3>
                <Slider {...settings}>
                    {filteredAnimalData.map((data) => {
                        const { id, title, thumbnail } = data;
                        return (
                            <div key={id} className='p-2 ml-6'>
                                <Link to={`/courses/player/${id}`} className='block bg-white border-2 border-green-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'>
                                    <img src={thumbnail} alt={title} className='w-full h-58 object-cover rounded-t-xl' />
                                    <div className='p-4'>
                                        <h4 className='text-lg font-semibold text-gray-800 hover:text-green-700 transition-colors'>{title}</h4>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </Slider>
            </section>

            {/* Plant Section */}
            <section className='bg-green-50 p-6 rounded-lg shadow-inner'>
                <h3 className='text-2xl ml-6 font-semibold mb-6 text-green-800'>🌱 बिरुवा कसरी बढ्ने ?</h3>
                <Slider {...settings}>
                    {filteredPlantData.map((data) => {
                        const { id, title, thumbnail } = data;
                        return (
                            <div key={id} className='p-2 ml-2'>
                                <Link to={`/courses/player/${id}`} className='block bg-white border-2 border-green-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300'>
                                    <img src={thumbnail} alt={title} className='w-full h-52 object-cover rounded-t-xl' />
                                    <div className='p-4'>
                                        <h4 className='text-lg font-semibold text-gray-800 hover:text-green-700 transition-colors'>{title}</h4>
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
