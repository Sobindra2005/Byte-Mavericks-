
import './App.css'
import Home from './Home'
import MainLayout from './layout'

function App() {
  return (
    <>
   
    <Home/>

      <MainLayout>
        <Routes>
          {/* <Route path="/" element={isLoggedIn ? <Course /> : <Home />} /> */}
        </Routes>
      </MainLayout>
    </>
  )
}

export default App
