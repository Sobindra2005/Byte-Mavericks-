
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './component/layout/layout'
import Diary from './component/dairy'
import RegionalCrops from './component/RegionalCrops/regionalCrops'
import Course from './component/courses/course'
import Player from './component/courses/player'
function App() {
  return (
    <>
    <Course />
       <MainLayout>
        <Routes>
          <Route path="/diary" element={<Diary /> } />
          <Route path="/regional-crops" element={<RegionalCrops /> } />
          <Route
            path="/courses/player/:id"
            element={ <Player />}
          />
        </Routes>
      </MainLayout> 
        
    </>
  )
}

export default App
