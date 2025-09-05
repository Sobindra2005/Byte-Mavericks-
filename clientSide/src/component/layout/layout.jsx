import { Link, useLocation } from "react-router-dom"
import Sidebar from "../Sidebar"
import logo from '../../assets/logo.svg'
import Navbar from "../../nav/Navbar";
import ChatAndScanner from "../../component/chatAndscanner";

const MainLayout = ({ children }) => {
    const location = useLocation();
    const isNotAuthenticated = (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup')
    return (
        <div className="max-h-screen h-screen flex flex-col">
            <header className="bg-[#142814] text-white p-2 ">
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
            </header>
            <div className="flex flex-1 relative h-0 min-h-0">
                {isNotAuthenticated ? <Navbar /> : <Sidebar />}
                {!isNotAuthenticated && <ChatAndScanner />}
                <main className={`flex-1 h-full overflow-auto ${!isNotAuthenticated ? 'p-4' : 'fixed top-0 w-full'}`}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout
