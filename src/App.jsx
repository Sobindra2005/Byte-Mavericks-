
import { Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './component/layout/layout'
import Diary from './component/dairy'

function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/diary" element={<Diary /> } />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
