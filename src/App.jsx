
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './component/layout/layout'
import Diary from './component/dairy'
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
    </>
  )
}

export default App
