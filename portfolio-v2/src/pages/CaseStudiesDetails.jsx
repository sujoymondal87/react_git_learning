import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import ReactMarkdown from 'react-markdown'


export default function CaseStudiesDetails() {
    const { slug } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single()
                if(error) throw error
                setPost(data)
            } catch(error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [])
    return (
        <div className="min-h-screen">
            {loading && <p className="text-gray-300 p-8">Loading...</p>}
            {error && <p className="text-red-400 p-8">Error: {error}</p>}
            {post && (
                <Layout>
                    <div className="py-6 md:py-16">
                        {/* Back button */}
                        <Link to="/case-studies" className="inline-flex items-center gap-2 text-amber-500 text-sm font-mono hover:underline mb-10 block">
                            ← Back to Case Studies
                        </Link>
    
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-white mb-8 max-w-3xl leading-tight">{post.title}</h1>
    
                        {/* Image */}
                        {post.imgurl && (
                            <img
                                src={post.imgurl}
                                alt={post.title}
                                className="w-full h-auto rounded-lg mb-12 object-contain"
                            />
                        )}
    
                        {/* Content */}
                        <div className="max-w-3xl">
                            <div className="prose prose-invert prose-lg max-w-none
                                prose-headings:text-white prose-headings:font-bold
                                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                                prose-li:text-gray-300
                                prose-strong:text-white
                                prose-code:text-amber-400">
                                <ReactMarkdown>
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </Layout>
            )}
        </div>
    )
}