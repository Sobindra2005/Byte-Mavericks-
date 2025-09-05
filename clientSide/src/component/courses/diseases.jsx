// Diseases.js
import React from 'react';
import disease from './disease';
import { useParams } from 'react-router-dom';

export default function Diseases() {
  const { id } = useParams(); 
  const diseaseData = disease.find(diseaseD => diseaseD.id === id);

  if (!diseaseData) {
    return <div>रोग भेटिएन।</div>;
  }

  return (
    <>
    <div className='m-4 flex flex-col'>
      <h2 className='text-2xl font-bold text-center'>रोग र यसको समाधान</h2>
    <div className=' items-center flex m-2 p-2'>
      <div className='flex flex-col  sm:flex-row'>
      <img className='aspect-square  sm:w-96 ' src={diseaseData["1"].Picture} alt={diseaseData["1"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["1"].Name}</h1>
      <p>{diseaseData["1"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["1"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img src={diseaseData["2"].Picture} alt={diseaseData["2"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["2"].Name}</h1 >
      <p>{diseaseData["2"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["2"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["3"].Picture} alt={diseaseData["3"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["3"].Name}</h1 >
      <p>{diseaseData["3"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["3"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["4"].Picture} alt={diseaseData["4"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2 p-2">{diseaseData["4"].Name}</h1>
      <p>{diseaseData["4"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["4"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["5"].Picture} alt={diseaseData["5"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["5"].Name}</h1 >
      <p>{diseaseData["5"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["5"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["6"].Picture} alt={diseaseData["6"].Name} />
      <div className='flex flex-colsm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["6"].Name}</h1 >
      <p>{diseaseData["6"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["6"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["7"].Picture} alt={diseaseData["7"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["7"].Name}</h1>
      <p>{diseaseData["7"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["7"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["8"].Picture} alt={diseaseData["8"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["8"].Name}</h1>
      <p>{diseaseData["8"].Description}</p>
      </div>
        <div>
      <h2>समाधान:</h2>
      <p>{diseaseData["8"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["9"].Picture} alt={diseaseData["9"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["9"].Name}</h1>
      <p>{diseaseData["9"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["9"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["10"].Picture} alt={diseaseData["10"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["10"].Name}</h1>
      <p>{diseaseData["10"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["10"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["11"].Picture} alt={diseaseData["11"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["11"].Name}</h1>
      <p>{diseaseData["11"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["11"].Solution}</p>
        </div>
      </div>
      </div>
      </div>
    <div className=' items-center m-2 p-2'>
      <div className='flex flex-col sm:flex-row'>
      <img  className='aspect-square  sm:w-96' src={diseaseData["12"].Picture} alt={diseaseData["12"].Name} />
      <div className='flex flex-col sm:m-4 p-2 border border-accent rounded-xl'>
      <div>
      <h1 className="font-bold m-2  text-xl">{diseaseData["12"].Name}</h1>
      <p>{diseaseData["12"].Description}</p>
      </div>
        <div>
      <h2 className='font-bold text-xl m-2'>समाधान:</h2>
      <p>{diseaseData["12"].Solution}</p>
        </div>
      </div>
      </div>
      </div>

    </div>
   
    </>
  );
}
