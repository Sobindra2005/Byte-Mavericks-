
import { Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './component/layout/layout'


function App() {
  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={isLoggedIn ? <Course /> : <Home />} />
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
