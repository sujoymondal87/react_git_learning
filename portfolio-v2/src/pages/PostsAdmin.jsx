import {useState, useEffect} from 'react'
import {supabase} from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import PostsTable from '../components/PostsTable'
import toast from 'react-hot-toast'
import { FiPlus } from 'react-icons/fi'
export default function PostsAdmin() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 10

    const totalPages = Math.ceil(posts.length / postsPerPage)
    const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
    )
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {data, error} = await supabase.from('posts').select('*')
                if(error) throw error
                setPosts(data)
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])
    const handleDelete = async (slug) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this post?')
            if(!confirmed) return
            const { error } = await supabase.from('posts').delete().eq('slug', slug)
            if(error) {
                toast.error(error.message)
                return
            }
            toast.success('Post deleted successfully', {
                position: 'top-right',
                duration: 3000,
                theme: {
                    primary: '#000',
                    secondary: '#fff',
                },
            })
            setPosts(posts.filter(p => p.slug !== slug))
        } catch(error) {
            console.error(error)
            toast.error(error.message)
        }
    }
    return (
        <div>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Posts</h1>
                <button 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition w-fit"
                onClick={() => navigate('/admin/posts/create')}
                >
                <FiPlus size={18} />
                Create Post
                </button>
                <PostsTable posts={paginatedPosts} loading={loading} error={error} onDelete={handleDelete} />
            </div>
            <div className="flex items-center gap-2 mt-4">
                <button 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-300 text-sm">{currentPage} / {totalPages}</span>
                <button 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}