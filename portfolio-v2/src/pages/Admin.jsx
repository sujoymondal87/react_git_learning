import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function Admin() {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await logout()
            navigate('/admin/login')
        } catch (error) {
            console.error(error)
        }
    }
    return(
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Admin</h1>
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={
          handleLogout}>Logout</button>
      </div>
    );
}

export default Admin