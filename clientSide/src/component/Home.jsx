import React from 'react'
import Main from "../assets/main.png";
import { Link } from 'react-router-dom';
import { useTextLang } from '../libs/utils';
import Course from './courses/course';
const Home = () => {
  return (
    <div
      className="relative w-full h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${Main})` }}
    ><h1>कृषि हाम्रो भविष्य हो</h1>

      <div className="absolute inset-0  bg-opacity-40"></div>
    
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className='text-4xl font-bold'>आजको खेती, भोलिको भविष्य।</h1>
        <h2 className="text-5xl font-bold m-2">
          {useTextLang("Are you interested", "के तपाईं कृषिमा रुचि राख्नुहुन्छ?")}
          
        </h2>
    
        <p className="text-2xl m-2">यदि तपाइँ इच्छुक हुनुहुन्छ भने</p>
        <Link
          to="/courses"
          className="text-white bg-accent hover:bg-fourth shadow-lg w-56 p-2 rounded-xl text-center mt-4"
        >
          यो लिङ्क क्लिक गर्नुहोस्
        </Link>
       
        <div className='mt-10 flex space-x-44'>
          <Link to="/courses">
            <button className='h-12 w-28 bg-amber-200 rounded-2xl text-black font-bold cursor-pointer hover:bg-amber-400'>
              Course
            </button>
          </Link>

          <Link to="/login">
            <button className='h-12 w-28 bg-amber-200 rounded-2xl text-black font-bold cursor-pointer hover:bg-amber-400'>
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
