
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import MainLayout from './component/layout/layout'
import Navbar from './nav/Navbar'
import Login from './components/login'import Diary from './component/dairy'
import RegionalCrops from './component/RegionalCrops/regionalCrops'

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/diary" element={<Diary /> } />
          <Route path="/regional-crops" element={<RegionalCrops /> } />
        </Routes>
      </MainLayout>
   <Navbar />
    <Home/>
    <Login />

    </>
  )
}

export default App
