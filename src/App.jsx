
import { Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import MainLayout from './layout'
import Navbar from './nav/Navbar'
import Login from './components/login'
function App() {
  return (
    <>
   <Navbar />
    <Home/>
    <Login />

    </>
  )
}

export default App
