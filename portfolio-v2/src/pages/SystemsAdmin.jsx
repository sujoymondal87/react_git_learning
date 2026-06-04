import {useState, useEffect} from 'react'
import {supabase} from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
export default function SystemsAdmin() {
    const [systems, setSystems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchSystems = async () => {
            const {data, error} = await supabase.from('systems').select('*')
        }
    }, [])
    return (
        <div>
            <h1>Systems Admin</h1>
            <p>Welcome to the systems admin page</p>
        </div>
    )
}