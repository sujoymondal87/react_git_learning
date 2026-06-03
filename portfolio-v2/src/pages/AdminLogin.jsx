import { useState } from 'react'
import {useAuth} from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) {
          console.log(error.message)
          setError(error.message)
          return
        }

        setUser(data.user)
        navigate('/admin')
        console.log(data)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin()
    }
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Admin Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <input className="border-2 border-gray-300 rounded-md p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password">Password</label>
                    <input className="border-2 border-gray-300 rounded-md p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="bg-blue-500 text-white rounded-md p-2" type="submit">Login</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
  }
  
  export default AdminLogin