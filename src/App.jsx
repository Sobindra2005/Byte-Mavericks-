
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import MainLayout from './component/layout/layout'
import Navbar from './nav/Navbar'
import Login from './components/login'
import Diary from './component/dairy'
import RegionalCrops from './component/RegionalCrops/regionalCrops'
import Course from './component/courses/course'
import Player from './component/courses/player'
function App() {
  return (
    <>
    
       <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/regional-crops" element={<RegionalCrops />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/courses/player/:id" element={<Player />} />
        </Routes>
      </MainLayout> 
        
    </>
  )
}

export default App
