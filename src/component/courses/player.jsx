import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Datas from './datas';
import Part from './part';
import Review from './review';
import ReviewForm from './writereview';

export default function Player() {
  const { id } = useParams();
  const [features,setFeatures] =useState()
  const data = Datas.find((item) => item.id === id);

  

  if (!data) {
    return <div>Data not found.</div>;
  }


  return (
    <>
      <div>
        <div className='flex flex-col justify-center items-center m-5 p-5'>
          <h1 className=' m-3 text-center font-bold text-3xl'>{data.title}</h1>
          <img src={data.thumbnail} alt={data.title} className='sm:w-96 sm:h-96' />
          <div>

          <h2 className='text-xl text-start mt-5 m-2 font-bold sm:ml-16'>यहाँ भिडियोको मुख्य बुँदाहरू छन्:</h2>
        <ul className="list-disc list-inside mb-4 sm:ml-16 space-y-5">
        {data.features && data.features.map((feature, index) => (
          <li key={index} >{feature}</li>
        ))}
        </ul>
        </div>
          <Link to={`/regional-crops/tomatoguide`} className='border border-accent p-2 rounded-xl hover:bg-accent hover:text-white '>
          कसरी रोप्ने
          </Link>
          </div>
        </div>
        <Part/>
        <div className='flex items-center justify-center m-5 space-x-4  '>
          <Link to={`/courses/player/${id}/diseases`} className='border border-accent p-2 rounded-xl hover:bg-accent hover:text-white '>
          यसको रोग र कारण पत्ता लगाउनुहोस्।
          </Link>
         
        </div>
          <Review/>
          <ReviewForm/>
      </>
  );
}
