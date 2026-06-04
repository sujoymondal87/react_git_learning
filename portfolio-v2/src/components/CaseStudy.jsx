import { supabase } from '../lib/supabase'
import { useState, useEffect } from 'react'
import Card from './Card';
import { Link } from 'react-router-dom';

export default function CaseStudy() {
    const [posts, setPosts] = useState([])
    const [totalPosts, setTotalPosts] = useState(0);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data, error, count } = await supabase.from('posts').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(6)
                setTotalPosts(count)
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
    return (
        <section className="py-16">
            <p className="text-amber-500 text-sm font-mono mb-4">{totalPosts} / Case Studies</p>
            <h2 className="text-3xl font-bold text-white mb-10">Engineering decisions. In public.</h2>
            <div className="grid grid-cols-3 gap-4 mb-8">
                {posts
                    .map((post) => (
                        <Card key={post.id} url="case-studies" id={post.id} slug={post.slug} imgUrl={post.imgurl} name={post.title} desc={post.content} timestamp={post.created_at} />
                ))}
            </div>
            <Link to="/case-studies" className="text-amber-500 text-sm font-mono hover:underline">
                View all case studies →
            </Link>
        </section>
    )
}