import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Datas from './datas';
import Part from './part';
import Review from './review';
import ReviewForm from './writereview';
import { useTextLang } from '../../libs/utils';

export default function Player() {
  const { id } = useParams();
  const data = Datas.find((item) => item.id === id);

  if (!data) {

    return <div className="flex justify-center items-center h-screen">Data not found.</div>;
  }
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h1 className="mb-4 text-center font-bold text-3xl text-green-800">{useTextLang(data.title_en, data.title)}</h1>
          <img src={data.thumbnail} alt={data.title} className="w-full max-w-md h-64 object-cover rounded-xl shadow mb-6" />
          <div className="w-full">
            <h2 className="text-xl font-bold text-green-700 mb-3">{useTextLang("Here are the main points of the video:", "यहाँ भिडियोको मुख्य बुँदाहरू छन्:")}</h2>
            <ul className="list-disc list-inside mb-6 space-y-3 pl-4">
              {data.features && data.features.map((feature, index) => (
                <li key={index} className="text-gray-800 text-base">{feature}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <Link to={`/courses/player/${id}/cultivation`} className="border border-green-500 text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all shadow">
                {useTextLang('How to Plant', 'कसरी रोप्ने')}
              </Link>
              <Link to={`/courses/player/${id}/diseases`} className="border border-green-500 text-green-700 px-5 py-2 rounded-full font-semibold hover:bg-green-500 hover:text-white transition-all shadow">
                {useTextLang('Identify its diseases and causes', 'यसको रोग र कारण पत्ता लगाउनुहोस्।')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4">
        <Part />
        <Review />
        <ReviewForm />
      </div>
    </>
  );
}
