import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import System from './pages/System'
import SystemDetails from './pages/SystemDetails'
import CaseStudies from './pages/CaseStudies'
import CaseStudiesDetails from './pages/CaseStudiesDetails'
import Footer from './components/Footer'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/system" element={<System/>} />
        <Route path="/systems/:slug" element={<SystemDetails/>} />
        <Route path="/case-studies" element={<CaseStudies/>} />
        <Route path="/case-studies/:slug" element={<CaseStudiesDetails/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App