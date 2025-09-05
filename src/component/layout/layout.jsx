import { Link } from "react-router-dom"
import Sidebar from "../Sidebar"
import logo from '../../assets/logo.svg'

const MainLayout = ({ children }) => {
    return (
        <div className="max-h-screen h-screen flex flex-col">
            <header className="bg-[#142814] text-white p-2 ">
                <Link to='/' className='flex items-center cursor-pointer'>
                    <img src={logo} alt="" />
                    <h6 className='text-xl'>Agro-Sikshya</h6>
                </Link>
            </header>
            <div className="flex flex-1 relative h-0 min-h-0">
                <Sidebar />
                <main className="flex-1 h-full overflow-auto p-4">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout