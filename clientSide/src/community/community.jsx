import React from 'react'
import { CiSearch } from "react-icons/ci";
// import Createpost from './createpost';
import { useState } from 'react';
import Expert from './expert';
import Faq from './faq';
export default function Community() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    problem: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();


  
  };


  return (
    <>
      <div className='mt-8 '>

        <div className='flex justify-between'>
          <h6 className='font-bold text-3xl ml-13  '>विज्ञहरू सँग सल्लाह</h6>
          <div className='flex px-6 space-x-2'>
            <div className=' justify-center items-center  hidden'>
              <input type="search" name="" id="" className='border bg-secondary rounded-xl p-1  ' placeholder='Search topics..' />
              <button>  <CiSearch className='border text-3xl rounded-sm p-1 bg-secondary' /></button>
            </div>
          </div>
        </div>
        <div className='flex justify-center m-2 '>
          <Expert formData={formData} setFormData={setFormData} handleSubmit={handleSubmit}/>
        </div>
          <Faq/>
      </div>
    </>
  )
}
