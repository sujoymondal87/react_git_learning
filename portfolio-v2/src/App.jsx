import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
import System from './pages/System'
import SystemDetails from './pages/SystemDetails'
import CaseStudies from './pages/CaseStudies'
import CaseStudiesDetails from './pages/CaseStudiesDetails'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute.jsx'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/system" element={<System/>} />
          <Route path="/systems/:slug" element={<SystemDetails/>} />
          <Route path="/case-studies" element={<CaseStudies/>} />
          <Route path="/case-studies/:slug" element={<CaseStudiesDetails/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>} />
          <Route path="/admin/login" element={<AdminLogin/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App