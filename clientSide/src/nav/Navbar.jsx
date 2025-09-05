import React from "react";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import useStore from "../store";
import { useTextLang } from "../libs/utils";

const Navbar = () => {
  const setLanguage = useStore((state) => state.setLanguage);
  const loginLabel = useTextLang("Login", "लगइन");
  const registerLabel = useTextLang("Register", "दर्ता");
  const brandLabel = "Agro-Sikshya";
  return (
    <div
      className="fixed top-0 left-0 w-full h-16 z-50 flex justify-between items-center px-8
                 bg-[rgba(20,40,20,0.65)] backdrop-blur-md border-b border-white/20 shadow-lg"
    >
 
      <Link to="/" className="flex items-center cursor-pointer group">
        <img
          src={Logo}
          alt="Logo"
          className="h-10 w-10 mr-2 transition-transform duration-300 group-hover:scale-110"
        />
        <h6 className="text-xl font-semibold text-white tracking-wide group-hover:text-[#FFD54F] transition-colors duration-300">
          {brandLabel}
        </h6>
      </Link>

    
      <ul className="flex space-x-6 sm:space-x-10 items-center font-medium">
        <button
          onClick={setLanguage}
          className="text-white/90 hover:text-[#FFD54F] transition-colors duration-300 cursor-pointer tracking-wide"
        >
          {useTextLang("EN/NP", "ने/इं")}
        </button>
        
        <Link to="/login">
          <li
            className="text-white/90 hover:text-[#FFD54F] transition-colors duration-300 
                       cursor-pointer tracking-wide"
          >
            {loginLabel}
          </li>
        </Link>

        <Link to="/signin">
          <li
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FFD54F] to-[#FFB300] 
                       text-black font-semibold shadow-md hover:scale-105 
                       transition-transform duration-300 cursor-pointer"
          >
            {registerLabel}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;