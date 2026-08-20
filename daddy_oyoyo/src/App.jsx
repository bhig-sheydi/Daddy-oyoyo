import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
// import About from './pages/About'
// import NotFound from './pages/NotFound'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App