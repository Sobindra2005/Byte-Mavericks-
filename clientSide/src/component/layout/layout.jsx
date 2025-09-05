import { Link, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import logo from "../../assets/logo.svg";
import Navbar from "../../nav/Navbar";
import ChatAndScanner from "../../component/chatAndscanner";
import { BsGlobe } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import useStore from "../../store";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);
  const isNotAuthenticated =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/signin";
  return (
    <div className="max-h-screen h-screen flex flex-col">
      <header className=" bg-gradient-to-r from-[#142814] to-[#0e1d0e] text-white px-5 py-2 flex justify-between items-center shadow">
        <div className="flex items-center gap-3">
          
          <Link to="/" className="flex items-center cursor-pointer group">
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-10 mr-2 transition-transform duration-300 group-hover:scale-110"
            />
            <h6 className="text-xl font-semibold text-white tracking-wide group-hover:text-[#FFD54F] transition-colors duration-300">
              Agro-Sikshya
            </h6>
          </Link>
        </div>

        <button
          onClick={() => setLanguage()}
          className="flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 px-3 py-1 text-sm transition-colors"
          aria-label="Toggle language"
        >
          <BsGlobe className="text-white/90" />
          <span className="font-medium">
            {language === "en" ? "ने/इं" : "EN/NP"}
          </span>
        </button>
      </header>
      <div className="flex flex-1 min-h-0 bg-[#f7f9fb]">
        {isNotAuthenticated ? <Navbar /> : <Sidebar />}
        {!isNotAuthenticated && <ChatAndScanner />}
        <main className={`flex-1 h-full overflow-auto ${!isNotAuthenticated ? "p-4" : "fixed w-full"}`}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
