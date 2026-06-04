import { useNavigate } from 'react-router-dom'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'




export default function PostsTable({posts, loading, error , onDelete}) {
    const navigate = useNavigate()
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
                <tr>
                    <th className="px-6 py-3 w-1/4">Title</th>
                    <th className="px-6 py-3 w-1/2">Content</th>
                    <th className="px-6 py-3 w-1/4">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                {posts.length > 0 ? posts.map((post) => (
                    <tr key={post.id} className="bg-gray-900 hover:bg-gray-800 transition">
                    <td className="px-6 py-4 text-white font-medium">{post.title}</td>
                    <td className="px-6 py-4 text-gray-300">{post.content?.slice(0, 150)}...</td>
                    <td className="px-6 py-4">
                        <div className="flex gap-2">
                            <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition" 
                            onClick={() => navigate(`/admin/posts/edit/${post.slug}`)}>
                            <FiEdit2 size={14} /> Edit
                            </button>
                            <button className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition" 
                            onClick={() => onDelete(post.slug)}>
                            <FiTrash2 size={14} /> Delete
                            </button>
                        </div>
                    </td>
                    </tr>
                )) : (
                    <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">No posts found</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}