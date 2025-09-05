
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './component/Home'
import MainLayout from './component/layout/layout'
import Login from './component/login'
import Diary from './component/dairy'
import RegionalCrops from './component/RegionalCrops/regionalCrops'
import Course from './component/courses/course'
import Player from './component/courses/player'
import Signin from './component/signin'
import Dashboard from './component/dashboard'
import Community from './community/community'
import DiseaseDetection from './component/DiseaseDetection'

import Marketplace from './component/Marketplace'
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
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/community" element={<Community/>} />
          <Route path="/disease-detection" element={<DiseaseDetection/>} />

          <Route path="/market" element={< Marketplace/>} />
        </Routes>
      </MainLayout> 
        
    </>
  )
}

export default App
