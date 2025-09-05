import React from 'react';
import { useParams } from 'react-router-dom';
import Datas from './datas';

export default function Part() {
    const { id } = useParams();
    const data = Datas.find((item) => item.id === id);

    return (
        <>
            <div>
                <div className="relative w-full bg-white pt-10 pb-8 mt-8 shadow-xl ring-1 ring-accent sm:mx-auto sm:max-w-4xl sm:rounded-lg sm:px-10">
                    <div className="mx-auto">
                        <div className="flex flex-col items-center">
                            <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-3xl text-accent">{data.subtitle}</h2>
                            <p className="mt-3 text-lg text-neutral-500 md:text-xl">धेरै सोधिएका प्रश्नहरू</p>
                        </div>
                        <div className="mx-auto mt-8 grid divide-y divide-neutral-200">
                            {data.videoURl.map((video, index) => (
                                <div className="py-5" key={index}>
                                    <details className="group">
                                        <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                                            <span className='font-bold m-2 text-xl'>{video.urlTitle}</span>
                                            <span className="transition group-open:rotate-180">
                                                <svg fill="none" height="24" shapeRendering="geometricPrecision"
                                                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                    strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                                                    <path d="M6 9l6 6 6-6"></path>
                                                </svg>
                                            </span>
                                        </summary>
                                        <iframe src={video.url}  className='sm:w-[800px] sm:h-[400px]' title={`Video Player ${index + 1}`}></iframe>
                                       <p>पूर्ण भिडियो हेर्नुहोस् र खेतीका बारेमा सिक्नको लागि आवश्यक जानकारी प्राप्त गर्नुहोस्!    </p>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
