import React, { useState } from 'react';
import Slider from "react-slick";
import Datas from './datas';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { IoIosArrowBack,IoIosArrowForward  } from "react-icons/io";
// Custom Next Arrow Component
const NextArrow = ({ onClick }) => {
    return (
        <div 
            className='absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full p-2 cursor-pointer z-10'
            onClick={onClick}
        >
            <IoIosArrowForward size={30} color='#fff' className='bg-accent' />    
        </div>
    );
};

// Custom Previous Arrow Component
const PrevArrow = ({ onClick }) => {
    return (
        <div 
            className='absolute top-1/2 left-0 transform -translate-y-1/2  rounded-full p-2 cursor-pointer z-10'
            onClick={onClick}
        >
            <IoIosArrowBack size={30} color='#fff' className='bg-accent' />
        </div>
    );
};

export default function Course() {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        infinite:true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
    };

    const [animalType, setAnimalType] = useState('animal');
    const filteredAnimalData = Datas.filter(data => data.type === animalType);

    const [plantType, setPlantType] = useState('plant')
    const filterPlantData = Datas.filter(data => data.type === plantType)

    return (
        <>
            <div className='m-5'>
                <h3 className='text-center font-bold text-2xl'>Courses</h3>
                <h4 className='text-xl mt-4 font-bold'>कसरी पशुपालन गर्ने ?</h4>
                <div className="slider-container relative">
                    <Slider {...settings}>
                        {filteredAnimalData.map((data, index) => {
                            let { id, title, thumbnail } = data;
                            return (
                                <div key={id} className='border p-4 m-2 rounded-md'>
                                    <Link to={`/courses/player/${id}`}>
                                     <img className='mb-4' src={thumbnail} alt={title} />
                                     <h4>{title}</h4>
                                    </Link>
                                </div>
                           
                            );
                        })}
                    </Slider>
                </div>

                <h3 className='text-xl mt-8 font-bold'>बिरुवा कसरी बढ्ने ? </h3>
                <div className="slider-container relative">
                    <Slider {...settings}>
                        {filterPlantData.map((data, index) => {
                            let { id, title, thumbnail } = data;
                            return (
                                <div key={id} className='border p-4 m-2 rounded-md'>
                                    <Link to={`/courses/player/${id}`}>
                                    <img className='mb-4' src={thumbnail} alt={title} />
                                    <h4>{title}</h4>
                                    </Link>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </>
    );
}
