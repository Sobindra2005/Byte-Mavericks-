import React from "react";
import { CiSearch } from "react-icons/ci";
// import Createpost from './createpost';
import { useState } from "react";
import Expert from "./expert";
import Faq from "./faq";
import { useTextLang } from "../libs/utils";
export default function Community() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    problem: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="mt-8 ">
        <div className="flex justify-center mb-4">
          <h6 className="font-bold text-3xl ml-13  text-center ">
            {useTextLang("🌿 Our Experts", "🌿 हाम्रा विशेषज्ञहरु")}
          </h6>
        </div>
        <div className="flex justify-center m-2 ">
          <Expert
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
          />
        </div>
        <Faq />
      </div>
    </>
  );
}
