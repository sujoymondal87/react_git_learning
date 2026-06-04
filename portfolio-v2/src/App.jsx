import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import AdminLayout from './components/AdminLayout.jsx'
import SystemsAdmin from './pages/SystemsAdmin'
import PostsAdmin from './pages/PostsAdmin'
import CreatePostAdmin from './pages/CreatePostAdmin'
import { Toaster } from 'react-hot-toast'
// import CreateSystemAdmin from './pages/CreateSystemAdmin'

function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin') && !location.pathname.startsWith('/admin/login')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Toaster />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/system" element={<System/>} />
        <Route path="/systems/:slug" element={<SystemDetails/>} />
        <Route path="/case-studies" element={<CaseStudies/>} />
        <Route path="/case-studies/:slug" element={<CaseStudiesDetails/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout>
            </AdminLayout>
          </ProtectedRoute>
        }>
          <Route index element={<Admin/>} />
          <Route path="posts" element={<PostsAdmin/>} />
          <Route path="posts/create" element={<CreatePostAdmin/>} /> 
          <Route path="posts/edit/:slug" element={<CreatePostAdmin/>} />
          <Route path="systems" element={<SystemsAdmin/>} />
          {/*<Route path="systems/create" element={<CreateSystemAdmin/>} /> */}
        </Route>
        <Route path="/admin/login" element={<AdminLogin/>} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App